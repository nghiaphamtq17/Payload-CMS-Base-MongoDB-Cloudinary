import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Skills: CollectionConfig = {
  slug: 'skills',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'experience', 'years', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Skill Name',
    },
    {
      name: 'experience',
      type: 'select',
      required: true,
      label: 'Experience Level',
      options: [
        {
          label: 'Beginner',
          value: 'Beginner',
        },
        {
          label: 'Intermediate',
          value: 'Intermediate',
        },
        {
          label: 'Advanced',
          value: 'Advanced',
        },
        {
          label: 'Expert',
          value: 'Expert',
        },
      ],
    },
    {
      name: 'years',
      type: 'text',
      required: true,
      label: 'Years of Experience',
      admin: {
        description: 'Ví dụ: "4 years", "6 months"',
      },
    },
    {
      name: 'projects',
      type: 'text',
      required: true,
      label: 'Number of Projects',
      admin: {
        description: 'Ví dụ: "15+ projects", "2+ projects"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'Mô tả ngắn về skill này',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'skill-categories' as const,
      required: true,
      label: 'Category',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
