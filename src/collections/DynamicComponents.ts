import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const DynamicComponents: CollectionConfig = {
  slug: 'dynamic-components',
  labels: {
    singular: 'Dynamic Component',
    plural: 'Dynamic Components',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    description: 'Instances of dynamic components with their data.',
    group: 'Content',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name for this component instance',
      },
    },
    {
      name: 'componentDefinition',
      type: 'relationship',
      relationTo: 'component-definitions',
      required: true,
      admin: {
        description: 'Select which component type this instance will use',
      },
    },
    {
      name: 'data',
      type: 'json',
      required: true,
      admin: {
        description:
          'Component data - this will be populated based on the selected component definition',
      },
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      unique: true,
      admin: {
        description: 'Unique identifier for this component instance',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Tags to help organize and find components',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this component is published and available for use',
      },
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Preview image for this component instance',
      },
    },
  ],
}
