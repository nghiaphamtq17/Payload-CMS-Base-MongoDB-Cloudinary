import type { Field } from 'payload'

interface ComponentField {
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
}

export const createDynamicFields = (fields: ComponentField[]): Field[] => {
  return fields.map((field) => {
    const baseField: Field = {
      name: field.name,
      type: field.type as any,
      required: field.required || false,
      admin: {
        ...field.admin,
        description: field.helpText,
        placeholder: field.placeholder,
      },
    }

    // Add label if provided
    if (field.label) {
      baseField.label = field.label
    }

    // Add default value if provided
    if (field.defaultValue !== undefined) {
      baseField.defaultValue = field.defaultValue
    }

    // Handle specific field types
    switch (field.type) {
      case 'select':
      case 'radioGroup':
        if (field.options) {
          baseField.options = field.options
        }
        break

      case 'relationship':
        if (field.relationTo) {
          baseField.relationTo = field.relationTo
        }
        if (field.hasMany) {
          baseField.hasMany = true
        }
        break

      case 'array':
        if (field.arrayFields) {
          baseField.fields = field.arrayFields.map((arrayField) => ({
            name: arrayField.name,
            type: arrayField.type as any,
            required: arrayField.required || false,
          }))
        }
        break

      case 'group':
        if (field.groupFields) {
          baseField.fields = field.groupFields.map((groupField) => ({
            name: groupField.name,
            type: groupField.type as any,
            required: groupField.required || false,
          }))
        }
        break

      case 'richText':
        // Import lexical editor for rich text fields
        baseField.editor = {
          name: 'lexical',
        }
        break
    }

    return baseField
  })
}

export const createDynamicComponentField = (componentDefinitions: any[]): Field => {
  return {
    name: 'component',
    type: 'relationship',
    relationTo: 'component-definitions',
    required: true,
    admin: {
      description: 'Select a component type to use',
    },
    filterOptions: {
      isActive: {
        equals: true,
      },
    },
  }
}

export const createDynamicDataField = (componentDefinition?: any): Field => {
  return {
    name: 'data',
    type: 'json',
    required: true,
    admin: {
      description:
        'Component data - this will be populated based on the selected component definition',
      condition: (data, siblingData) => {
        return Boolean(siblingData?.component)
      },
    },
  }
}
