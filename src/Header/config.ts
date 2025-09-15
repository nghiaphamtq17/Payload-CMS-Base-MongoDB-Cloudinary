import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
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
          'Optional custom logo for header. If empty, the default Logo component is used.',
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
      type: 'row',
      fields: [
        {
          name: 'logoHeight',
          type: 'number',
          label: 'Logo height (px)',
          defaultValue: 32,
          admin: { width: '50%' },
        },
        {
          name: 'logoWidth',
          type: 'number',
          label: 'Logo width (px)',
          defaultValue: 120,
          admin: { width: '50%' },
        },
      ],
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.showLogo),
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
