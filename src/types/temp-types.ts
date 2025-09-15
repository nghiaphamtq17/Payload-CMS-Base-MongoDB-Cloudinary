// Temporary type definitions for i18n system
// These will be replaced by generated payload types after running: pnpm generate:types

export interface Language {
  id: string
  name: string
  code: string
  nativeName?: string
  flag?: string
  isDefault?: boolean
  isActive?: boolean
  direction?: 'ltr' | 'rtl'
  dateFormat?: string
  currency?: string
  createdAt: string
  updatedAt: string
}

export interface Translation {
  id: string
  key: string
  language: string | Language
  value: string
  context?: string
  componentType?: 'dynamic-component' | 'page-content' | 'navigation' | 'form' | 'ui' | 'other'
  componentId?: string
  fieldName?: string
  status?: 'draft' | 'review' | 'approved' | 'published'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface DynamicComponent {
  id: string
  name: string
  slug: string
  componentDefinition: string | ComponentDefinition
  data: Record<string, any>
  tags?: Array<{ tag: string }>
  isPublished?: boolean
  previewImage?: string | Media
  supportsI18n?: boolean
  createdAt: string
  updatedAt: string
}

export interface ComponentDefinition {
  id: string
  name: string
  slug: string
  description?: string
  category: 'layout' | 'content' | 'media' | 'interactive' | 'navigation' | 'form' | 'custom'
  icon?: string
  fields: Array<{
    name: string
    label?: string
    type: string
    required?: boolean
    defaultValue?: string
    placeholder?: string
    helpText?: string
    options?: Array<{ label: string; value: string }>
    relationTo?: string
    hasMany?: boolean
    arrayFields?: Array<{
      name: string
      type: string
      required?: boolean
    }>
    groupFields?: Array<{
      name: string
      type: string
      required?: boolean
    }>
    admin?: {
      position?: 'default' | 'sidebar'
      readOnly?: boolean
      hidden?: boolean
    }
  }>
  previewImage?: string | Media
  isActive?: boolean
  supportsI18n?: boolean
  translatableFields?: Array<{
    fieldName: string
    translationKey?: string
    isRequired?: boolean
  }>
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: string
  alt?: string
  url: string
  width?: number
  height?: number
  filename?: string
  mimeType?: string
  filesize?: number
  createdAt: string
  updatedAt: string
}
