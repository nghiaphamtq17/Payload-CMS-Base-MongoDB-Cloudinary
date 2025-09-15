import type { Block } from 'payload'

export const DynamicComponentBlock: Block = {
  slug: 'dynamicComponent',
  interfaceName: 'DynamicComponentBlock',
  fields: [
    {
      name: 'component',
      type: 'relationship',
      relationTo: 'dynamic-components' as const,
      required: true,
      admin: {
        description: 'Select a dynamic component to display',
      },
    },
    {
      name: 'customClassName',
      type: 'text',
      admin: {
        description: 'Custom CSS classes to apply to this component',
      },
    },
    {
      name: 'customStyles',
      type: 'json',
      admin: {
        description: 'Custom inline styles (JSON object)',
      },
    },
    {
      name: 'containerSettings',
      type: 'group',
      fields: [
        {
          name: 'disableInnerContainer',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Disable the default container wrapper',
          },
        },
        {
          name: 'maxWidth',
          type: 'select',
          options: [
            { label: 'Full Width', value: 'full' },
            { label: 'Container', value: 'container' },
            { label: 'Small', value: 'max-w-sm' },
            { label: 'Medium', value: 'max-w-md' },
            { label: 'Large', value: 'max-w-lg' },
            { label: 'Extra Large', value: 'max-w-xl' },
            { label: '2XL', value: 'max-w-2xl' },
            { label: '3XL', value: 'max-w-3xl' },
            { label: '4XL', value: 'max-w-4xl' },
            { label: '5XL', value: 'max-w-5xl' },
            { label: '6XL', value: 'max-w-6xl' },
            { label: '7XL', value: 'max-w-7xl' },
          ],
          defaultValue: 'container',
        },
        {
          name: 'padding',
          type: 'select',
          options: [
            { label: 'None', value: 'p-0' },
            { label: 'Small', value: 'p-2' },
            { label: 'Medium', value: 'p-4' },
            { label: 'Large', value: 'p-6' },
            { label: 'Extra Large', value: 'p-8' },
            { label: 'X Large', value: 'p-12' },
            { label: '2X Large', value: 'p-16' },
            { label: '3X Large', value: 'p-20' },
          ],
          defaultValue: 'p-4',
        },
      ],
    },
  ],
}
