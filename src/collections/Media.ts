import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import crypto from 'crypto'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || ''
const API_KEY = process.env.CLOUDINARY_API_KEY || ''
const API_SECRET = process.env.CLOUDINARY_API_SECRET || ''

const signParams = (params: Record<string, string | number | boolean | undefined>) => {
  const entries = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== '')
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  const toSign = entries.map(([k, v]) => `${k}=${v}`).join('&') + API_SECRET
  return crypto.createHash('sha1').update(toSign).digest('hex')
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc, operation }) => {
        // Handle only create/update with new file buffer
        // When admin uploads, Payload sets data.file (buffer + metadata)
        const incoming: any = (req as any)?.file || (data as any)?.file
        if (!incoming || !incoming.buffer) return data

        const timestamp = Math.floor(Date.now() / 1000)
        const fileBase64 = `data:${incoming.mimetype || 'application/octet-stream'};base64,${Buffer.from(
          incoming.buffer,
        ).toString('base64')}`

        const uploadEndpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`
        const formBody = new URLSearchParams()
        formBody.set('file', fileBase64)

        const unsignedPreset = process.env.CLOUDINARY_UPLOAD_PRESET || ''
        if (unsignedPreset) {
          // Unsigned upload per Cloudinary docs
          formBody.set('upload_preset', unsignedPreset)
        } else {
          // Signed upload (minimal params)
          formBody.set('api_key', API_KEY)
          formBody.set('timestamp', String(timestamp))
          const signature = signParams({ timestamp })
          formBody.set('signature', signature)
        }

        const res = await fetch(uploadEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formBody.toString(),
        })
        if (!res.ok) {
          const errText = await res.text().catch(() => '')
          throw new Error(`Cloudinary upload failed: ${res.status} ${res.statusText} ${errText}`)
        }
        const result = await res.json()

        // Persist Cloudinary identifiers and canonical secure URL
        data.filename = result.public_id
        ;(data as any).url = result.secure_url
        ;(data as any).cloudinaryVersion = result.version
        ;(data as any).filesize = result.bytes
        ;(data as any).mimeType =
          result.resource_type === 'image' ? `image/${result.format}` : incoming.mimetype

        // Prevent local file handling by clearing file buffer
        if (data?.file) delete (data as any).file
        return data
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        try {
          const fromFilename = typeof doc?.filename === 'string' ? doc.filename : ''
          const fromUrl = typeof (doc as any)?.url === 'string' ? (doc as any).url : ''

          const extractPublicId = (val: string): string => {
            if (!val) return ''
            if (val.startsWith('http')) {
              // Match .../upload/(v12345/)?<public_id>(.ext optional)
              const m = val.match(/\/upload\/(?:v\d+\/)?([^.?#]+)(?:\.[a-zA-Z0-9]+)?(?=$|[?#])/)
              return m?.[1] || ''
            }
            // Assume it's a public_id, strip extension if any
            return val.replace(/\.[^/.]+$/, '')
          }

          const publicId = extractPublicId(fromFilename) || extractPublicId(fromUrl)
          if (!publicId) return

          const destroyViaUploadAPI = async (resourceType: 'image' | 'video' | 'raw') => {
            const timestamp = Math.floor(Date.now() / 1000)
            const sig = signParams({ public_id: publicId, timestamp })
            const body = new URLSearchParams()
            body.set('public_id', publicId)
            body.set('timestamp', String(timestamp))
            body.set('api_key', API_KEY)
            body.set('signature', sig)
            const resp = await fetch(
              `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/destroy`,
              { method: 'POST', body },
            )
            const json = await resp.json().catch(() => ({}))
            return json
          }

          const img = await destroyViaUploadAPI('image')
          if (img && (img.result === 'ok' || img.result === 'not_found')) return
          const vid = await destroyViaUploadAPI('video')
          if (vid && (vid.result === 'ok' || vid.result === 'not_found')) return
          await destroyViaUploadAPI('raw')
        } catch {
          // swallow to avoid blocking Payload delete
        }
      },
    ],
    afterRead: [async ({ doc }) => doc],
  },
  fields: [
    {
      name: 'preferredSizes',
      type: 'select',
      hasMany: true,
      defaultValue: ['origin'],
      required: false,
      options: [
        { label: 'Origin', value: 'origin' },
        { label: 'Thumbnail (300w)', value: 'thumbnail' },
        { label: 'Square (500x500)', value: 'square' },
        { label: 'Small (600w)', value: 'small' },
        { label: 'Medium (900w)', value: 'medium' },
        { label: 'Large (1400w)', value: 'large' },
        { label: 'XLarge (1920w)', value: 'xlarge' },
        { label: 'OpenGraph (1200x630)', value: 'og' },
      ],
      admin: {
        description: 'Chọn một hoặc nhiều kích thước mong muốn. Mặc định chỉ chọn Origin.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: ({ doc }) => {
      const url = typeof (doc as any)?.url === 'string' ? (doc as any).url : ''
      return url
    },
    focalPoint: true,
    // Note: sizes are controlled by Cloudinary transformations; local imageSizes disabled
  },
}
