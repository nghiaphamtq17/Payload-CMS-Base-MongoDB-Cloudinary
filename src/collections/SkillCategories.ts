import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const SkillCategories: CollectionConfig = {
  slug: 'skill-categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'color', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Category Title',
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      label: 'Icon Component',
      admin: {
        description: 'Tên của icon component (ví dụ: Code, Server, Database, Palette)',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      label: 'Color Gradient',
      admin: {
        description: 'Tailwind CSS gradient classes (ví dụ: from-blue-500 to-indigo-600)',
      },
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills' as const,
      hasMany: true,
      label: 'Skills',
      admin: {
        description: 'Chọn các skills thuộc category này',
      },
    },
    ...slugField(),
  ],
}
