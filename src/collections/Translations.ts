import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Translations: CollectionConfig = {
  slug: 'translations',
  labels: {
    singular: 'Bản dịch / Translation',
    plural: 'Bản dịch / Translations',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'key',
    description: 'Quản lý bản dịch cho nội dung website / Manage content translations',
    group: 'Cài đặt / Settings',
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Khóa bản dịch (VD: hero.title, card.description)',
      },
    },
    {
      name: 'language',
      type: 'relationship',
      relationTo: 'languages' as any,
      required: true,
      admin: {
        description: 'Ngôn ngữ cho bản dịch này',
      },
    },
    {
      name: 'value',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Nội dung đã dịch',
      },
    },
    {
      name: 'context',
      type: 'text',
      admin: {
        description: 'Ngữ cảnh hoặc thông tin sử dụng cho bản dịch này',
      },
    },
    {
      name: 'componentType',
      type: 'select',
      options: [
        { label: 'Dynamic Component', value: 'dynamic-component' },
        { label: 'Nội dung trang', value: 'page-content' },
        { label: 'Điều hướng', value: 'navigation' },
        { label: 'Biểu mẫu', value: 'form' },
        { label: 'Giao diện', value: 'ui' },
        { label: 'Khác', value: 'other' },
      ],
      defaultValue: 'dynamic-component',
    },
    {
      name: 'componentId',
      type: 'text',
      admin: {
        description: 'ID của component mà bản dịch này thuộc về',
      },
    },
    {
      name: 'fieldName',
      type: 'text',
      admin: {
        description: 'Tên của field mà bản dịch này dành cho',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Bản nháp', value: 'draft' },
        { label: 'Đang xem xét', value: 'review' },
        { label: 'Đã phê duyệt', value: 'approved' },
        { label: 'Đã xuất bản', value: 'published' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Ghi chú về bản dịch này',
      },
    },
  ],
}
