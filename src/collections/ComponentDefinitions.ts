import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const ComponentDefinitions: CollectionConfig = {
  slug: 'component-definitions',
  labels: {
    singular: 'Component Definition',
    plural: 'Component Definitions',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    description: 'Define reusable component types that can be used in pages and other content.',
    group: 'Content',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal name for the component (e.g., "Hero", "Card", "Gallery")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe identifier (e.g., "hero", "card", "gallery")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of what this component does',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Layout', value: 'layout' },
        { label: 'Content', value: 'content' },
        { label: 'Media', value: 'media' },
        { label: 'Interactive', value: 'interactive' },
        { label: 'Navigation', value: 'navigation' },
        { label: 'Form', value: 'form' },
        { label: 'Custom', value: 'custom' },
      ],
      defaultValue: 'content',
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon name from Lucide React (e.g., "image", "layout", "button")',
      },
    },
    {
      name: 'fields',
      type: 'array',
      required: true,
      admin: {
        description: 'Define the fields that this component will have',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Field name (e.g., "title", "description", "image")',
          },
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'Display label for the field',
          },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Rich Text', value: 'richText' },
            { label: 'Number', value: 'number' },
            { label: 'Email', value: 'email' },
            { label: 'URL', value: 'url' },
            { label: 'Date', value: 'date' },
            { label: 'Checkbox', value: 'checkbox' },
            { label: 'Select', value: 'select' },
            { label: 'Radio Group', value: 'radioGroup' },
            { label: 'Media', value: 'media' },
            { label: 'Relationship', value: 'relationship' },
            { label: 'Array', value: 'array' },
            { label: 'Group', value: 'group' },
            { label: 'JSON', value: 'json' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'defaultValue',
          type: 'text',
          admin: {
            description: 'Default value for the field',
          },
        },
        {
          name: 'placeholder',
          type: 'text',
          admin: {
            description: 'Placeholder text for input fields',
          },
        },
        {
          name: 'helpText',
          type: 'textarea',
          admin: {
            description: 'Help text to display below the field',
          },
        },
        {
          name: 'options',
          type: 'array',
          admin: {
            condition: (data, siblingData) => ['select', 'radioGroup'].includes(siblingData?.type),
            description: 'Options for select and radio group fields',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'relationTo',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'relationship',
            description: 'Collection name for relationship fields',
          },
        },
        {
          name: 'hasMany',
          type: 'checkbox',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'relationship',
          },
        },
        {
          name: 'arrayFields',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'array',
            description: 'Fields for array items',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Textarea', value: 'textarea' },
                { label: 'Number', value: 'number' },
                { label: 'Media', value: 'media' },
                { label: 'Relationship', value: 'relationship' },
              ],
            },
            {
              name: 'required',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'groupFields',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'group',
            description: 'Fields for group',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Textarea', value: 'textarea' },
                { label: 'Number', value: 'number' },
                { label: 'Media', value: 'media' },
                { label: 'Checkbox', value: 'checkbox' },
              ],
            },
            {
              name: 'required',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'admin',
          type: 'group',
          fields: [
            {
              name: 'position',
              type: 'select',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Sidebar', value: 'sidebar' },
              ],
            },
            {
              name: 'readOnly',
              type: 'checkbox',
            },
            {
              name: 'hidden',
              type: 'checkbox',
            },
          ],
        },
      ],
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Preview image for the component in the admin interface',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this component is available for use',
      },
    },
  ],
}
