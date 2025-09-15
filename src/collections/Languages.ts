import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Languages: CollectionConfig = {
  slug: 'languages',
  labels: {
    singular: 'Language',
    plural: 'Languages',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    description: 'Quản lý các ngôn ngữ cho website / Manage website languages',
    group: 'Cài đặt / Settings',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Tên ngôn ngữ (VD: English, Tiếng Việt)',
      },
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Mã ngôn ngữ (VD: en, vi, fr, de)',
      },
    },
    {
      name: 'nativeName',
      type: 'text',
      admin: {
        description: 'Tên bản địa của ngôn ngữ (VD: English, Tiếng Việt)',
      },
    },
    {
      name: 'flag',
      type: 'text',
      admin: {
        description: 'Biểu tượng cờ (VD: 🇺🇸, 🇻🇳)',
      },
    },
    {
      name: 'isDefault',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Đặt làm ngôn ngữ mặc định cho website',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Ngôn ngữ này có sẵn để sử dụng',
      },
    },
    {
      name: 'direction',
      type: 'select',
      options: [
        { label: 'Trái sang phải (LTR)', value: 'ltr' },
        { label: 'Phải sang trái (RTL)', value: 'rtl' },
      ],
      defaultValue: 'ltr',
    },
  ],
}
