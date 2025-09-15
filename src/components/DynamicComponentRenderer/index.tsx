import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import {
  getTranslation,
  getCurrentLanguage,
  formatDate,
  formatCurrency,
  formatNumber,
} from '@/utilities/i18n'

import type { DynamicComponent as DynamicComponentType } from '@/payload-types'
import type { Translation } from '@/types/temp-types'

interface DynamicComponentRendererProps {
  component: DynamicComponentType
  className?: string
  disableInnerContainer?: boolean
  translations?: Translation[]
  language?: string
}

export const DynamicComponentRenderer: React.FC<DynamicComponentRendererProps> = ({
  component,
  className,
  disableInnerContainer = false,
  translations = [],
  language = getCurrentLanguage(),
}) => {
  if (!component?.data || !component?.componentDefinition) {
    return null
  }

  const { data, componentDefinition } = component
  const { fields, slug: componentSlug } = componentDefinition

  // Helper function to get translated value
  const getTranslatedValue = (fieldName: string, value: any): any => {
    // Check if component supports i18n and has translations
    const supportsI18n = (component as any)?.supportsI18n || false
    if (!supportsI18n || !translations.length) {
      return value
    }

    const translationKey = `${component.id}.${fieldName}`
    const translatedValue = getTranslation(translationKey, language as any, translations)

    // Return translated value if found, otherwise return original value
    return translatedValue !== translationKey ? translatedValue : value
  }

  // Render field based on its type
  const renderField = (field: any, value: any, index: number) => {
    if (!value && value !== 0 && value !== false) return null

    const fieldKey = `field-${index}`
    const translatedValue = getTranslatedValue(field.name, value)

    switch (field.type) {
      case 'text':
      case 'textarea':
        return (
          <div key={fieldKey} className="field-text">
            {field.label && <label className="field-label">{field.label}</label>}
            <div className="field-value">{translatedValue}</div>
          </div>
        )

      case 'richText':
        return (
          <div key={fieldKey} className="field-richtext">
            {field.label && <label className="field-label">{field.label}</label>}
            <div
              className="field-value prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: translatedValue }}
            />
          </div>
        )

      case 'number':
        return (
          <div key={fieldKey} className="field-number">
            {field.label && <label className="field-label">{field.label}</label>}
            <div className="field-value">{formatNumber(translatedValue, language as any)}</div>
          </div>
        )

      case 'email':
        return (
          <div key={fieldKey} className="field-email">
            {field.label && <label className="field-label">{field.label}</label>}
            <a
              href={`mailto:${translatedValue}`}
              className="field-value text-blue-600 hover:underline"
            >
              {translatedValue}
            </a>
          </div>
        )

      case 'url':
        return (
          <div key={fieldKey} className="field-url">
            {field.label && <label className="field-label">{field.label}</label>}
            <a
              href={translatedValue}
              target="_blank"
              rel="noopener noreferrer"
              className="field-value text-blue-600 hover:underline"
            >
              {translatedValue}
            </a>
          </div>
        )

      case 'date':
        return (
          <div key={fieldKey} className="field-date">
            {field.label && <label className="field-label">{field.label}</label>}
            <div className="field-value">{formatDate(translatedValue, language as any)}</div>
          </div>
        )

      case 'checkbox':
        return value ? (
          <div key={fieldKey} className="field-checkbox">
            <div className="field-value flex items-center">
              <input type="checkbox" checked readOnly className="mr-2" />
              <span>{field.label || 'Enabled'}</span>
            </div>
          </div>
        ) : null

      case 'select':
      case 'radioGroup':
        return (
          <div key={fieldKey} className="field-select">
            {field.label && <label className="field-label">{field.label}</label>}
            <div className="field-value">{translatedValue}</div>
          </div>
        )

      case 'media':
        if (Array.isArray(value)) {
          return (
            <div key={fieldKey} className="field-media-array">
              {field.label && <label className="field-label">{field.label}</label>}
              <div className="field-value grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {value.map((media: any, mediaIndex: number) => (
                  <div key={mediaIndex} className="media-item">
                    {media?.url && (
                      <Image
                        src={media.url}
                        alt={media.alt || ''}
                        width={media.width || 400}
                        height={media.height || 300}
                        className="rounded-lg object-cover w-full h-48"
                      />
                    )}
                    {media?.alt && <p className="text-sm text-gray-600 mt-2">{media.alt}</p>}
                  </div>
                ))}
              </div>
            </div>
          )
        } else if (value?.url) {
          return (
            <div key={fieldKey} className="field-media">
              {field.label && <label className="field-label">{field.label}</label>}
              <div className="field-value">
                <Image
                  src={value.url}
                  alt={value.alt || ''}
                  width={value.width || 800}
                  height={value.height || 600}
                  className="rounded-lg object-cover w-full"
                />
                {value.alt && <p className="text-sm text-gray-600 mt-2">{value.alt}</p>}
              </div>
            </div>
          )
        }
        return null

      case 'relationship':
        if (Array.isArray(value)) {
          return (
            <div key={fieldKey} className="field-relationship-array">
              {field.label && <label className="field-label">{field.label}</label>}
              <div className="field-value">
                {value.map((item: any, itemIndex: number) => (
                  <div key={itemIndex} className="relationship-item p-2 border rounded">
                    {item.title || item.name || item.id}
                  </div>
                ))}
              </div>
            </div>
          )
        } else if (value) {
          return (
            <div key={fieldKey} className="field-relationship">
              {field.label && <label className="field-label">{field.label}</label>}
              <div className="field-value">{value.title || value.name || value.id}</div>
            </div>
          )
        }
        return null

      case 'array':
        if (Array.isArray(value)) {
          return (
            <div key={fieldKey} className="field-array">
              {field.label && <label className="field-label">{field.label}</label>}
              <div className="field-value space-y-4">
                {value.map((item: any, itemIndex: number) => (
                  <div key={itemIndex} className="array-item p-4 border rounded-lg">
                    {field.arrayFields?.map((arrayField: any, arrayFieldIndex: number) => (
                      <div key={arrayFieldIndex} className="mb-2">
                        {arrayField.name}: {item[arrayField.name]}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )
        }
        return null

      case 'group':
        if (typeof value === 'object' && value !== null) {
          return (
            <div key={fieldKey} className="field-group">
              {field.label && <label className="field-label">{field.label}</label>}
              <div className="field-value p-4 border rounded-lg">
                {field.groupFields?.map((groupField: any, groupFieldIndex: number) => (
                  <div key={groupFieldIndex} className="mb-2">
                    <strong>{groupField.name}:</strong> {value[groupField.name]}
                  </div>
                ))}
              </div>
            </div>
          )
        }
        return null

      case 'json':
        return (
          <div key={fieldKey} className="field-json">
            {field.label && <label className="field-label">{field.label}</label>}
            <div className="field-value">
              <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                {JSON.stringify(value, null, 2)}
              </pre>
            </div>
          </div>
        )

      default:
        return (
          <div key={fieldKey} className="field-unknown">
            {field.label && <label className="field-label">{field.label}</label>}
            <div className="field-value">{String(value)}</div>
          </div>
        )
    }
  }

  const containerClass = disableInnerContainer
    ? 'dynamic-component'
    : 'dynamic-component container mx-auto px-4'

  return (
    <div
      className={cn(containerClass, className)}
      data-component-type={componentSlug}
      data-component-id={component.id}
    >
      <div className="component-content">
        {fields?.map((field: any, index: number) => {
          const value = data[field.name]
          return renderField(field, value, index)
        })}
      </div>
    </div>
  )
}
