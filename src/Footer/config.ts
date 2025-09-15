import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'showLogo',
      type: 'checkbox',
      label: 'Show Logo',
      defaultValue: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional custom logo for footer. If empty, the default Logo component is used.',
        condition: (_, siblingData) => Boolean(siblingData?.showLogo),
      },
    },
    {
      name: 'logoHref',
      type: 'text',
      label: 'Logo link',
      defaultValue: '/',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.showLogo),
      },
    },
    {
      name: 'layout',
      type: 'group',
      label: 'Layout Settings',
      fields: [
        {
          name: 'columnsOnMobile',
          type: 'select',
          options: [
            { label: '1 column', value: '1' },
            { label: '2 columns', value: '2' },
          ],
          defaultValue: '1',
        },
        {
          name: 'columnsOnDesktop',
          type: 'select',
          options: [
            { label: '2 columns', value: '2' },
            { label: '3 columns', value: '3' },
            { label: '4 columns', value: '4' },
            { label: '5 columns', value: '5' },
            { label: '6 columns', value: '6' },
          ],
          defaultValue: '3',
        },
        {
          name: 'showThemeSwitcher',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Theme Switcher',
        },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Column Title',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Links',
          admin: { initCollapsed: true },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'maxItemsMobile',
              type: 'number',
              label: 'Max items (mobile)',
              defaultValue: 6,
              admin: { width: '50%' },
            },
            {
              name: 'maxItemsDesktop',
              type: 'number',
              label: 'Max items (desktop)',
              defaultValue: 8,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    // navItems removed in favor of column-based configuration
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
