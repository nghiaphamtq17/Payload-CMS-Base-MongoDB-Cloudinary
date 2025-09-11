import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Custom: CollectionConfig = {
  slug: 'customs',
  labels: {
    singular: 'Custom',
    plural: 'Customs',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    description: 'Flexible content you can customize freely.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      unique: true,
      admin: { description: 'Unique URL-safe slug (optional).' },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'data',
      type: 'json',
      admin: { description: 'Key-value JSON for advanced customization.' },
    },
  ],
}

