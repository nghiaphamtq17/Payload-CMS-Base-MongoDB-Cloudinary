import { v2 as cloudinary } from 'cloudinary'
import type { UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const uploadToCloudinary = (args: any): Promise<UploadApiResponse> => {
  const { file, req } = args

  const publicIdBase = file.filename?.replace(/\.[^/.]+$/, '') || `${Date.now()}`

  return new Promise((resolve, reject) => {
    // Only generate eager transforms for explicitly selected sizes (exclude origin)
    const selected = Array.isArray((args as any).doc?.preferredSizes)
      ? ((args as any).doc.preferredSizes as string[])
      : []
    const eager = selected
      .filter((s) => s && s !== 'origin')
      .map((s: string) => sizeToTransformation(s))
      .filter(Boolean) as Array<Record<string, unknown>>

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        public_id: publicIdBase,
        use_filename: true,
        overwrite: false,
        context: req?.user ? { uploader: String(req.user.id) } : undefined,
        eager: eager.length > 0 ? eager : undefined,
      },
      (error, result) => {
        if (error) return reject(error)
        if (!result) return reject(new Error('Cloudinary returned no result'))
        resolve(result)
      },
    )

    uploadStream.end(file.buffer)
  })
}

const sizeToTransformation = (size: string | undefined) => {
  switch (size) {
    case 'thumbnail':
      return { width: 300, crop: 'scale' as const }
    case 'square':
      return { width: 500, height: 500, crop: 'fill' as const, gravity: 'auto' as const }
    case 'small':
      return { width: 600, crop: 'scale' as const }
    case 'medium':
      return { width: 900, crop: 'scale' as const }
    case 'large':
      return { width: 1400, crop: 'scale' as const }
    case 'xlarge':
      return { width: 1920, crop: 'scale' as const }
    case 'og':
      return { width: 1200, height: 630, crop: 'fill' as const, gravity: 'auto' as const }
    case 'origin':
    default:
      return undefined
  }
}

// NOTE: legacy adapter removed in favor of per-collection hooks
