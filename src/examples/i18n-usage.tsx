/**
 * Internationalization (i18n) Usage Examples
 *
 * This file demonstrates how to use the i18n system with Dynamic Components
 */

import React from 'react'
import { DynamicComponentRenderer } from '@/components/DynamicComponentRenderer'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { getCurrentLanguage, getTranslation } from '@/utilities/i18n'
import type { DynamicComponent, ComponentDefinition } from '@/types/temp-types'
import type { Translation } from '@/types/temp-types'

// Example 1: Hero Component with Vietnamese and English translations
export const MultilingualHeroExample = () => {
  const heroComponent: DynamicComponent = {
    id: 'hero-1',
    name: 'Welcome Hero',
    slug: 'welcome-hero',
    supportsI18n: true,
    componentDefinition: {
      id: 'hero-def',
      name: 'Hero',
      slug: 'hero',
      category: 'content' as const,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'textarea',
          required: false,
        },
        {
          name: 'ctaText',
          label: 'Call to Action Text',
          type: 'text',
          required: false,
        },
      ],
    },
    data: {
      title: 'Welcome to Our Website',
      subtitle: 'Discover amazing content and services',
      ctaText: 'Get Started',
    },
  }

  // Sample translations
  const translations: Translation[] = [
    {
      id: '1',
      key: 'hero-1.title',
      language: 'vi',
      value: 'Chào mừng đến với Website của chúng tôi',
      status: 'published',
    },
    {
      id: '2',
      key: 'hero-1.subtitle',
      language: 'vi',
      value: 'Khám phá nội dung và dịch vụ tuyệt vời',
      status: 'published',
    },
    {
      id: '3',
      key: 'hero-1.ctaText',
      language: 'vi',
      value: 'Bắt đầu',
      status: 'published',
    },
    {
      id: '4',
      key: 'hero-1.title',
      language: 'en',
      value: 'Welcome to Our Website',
      status: 'published',
    },
    {
      id: '5',
      key: 'hero-1.subtitle',
      language: 'en',
      value: 'Discover amazing content and services',
      status: 'published',
    },
    {
      id: '6',
      key: 'hero-1.ctaText',
      language: 'en',
      value: 'Get Started',
      status: 'published',
    },
  ]

  const currentLanguage = getCurrentLanguage()

  return (
    <div className="multilingual-hero-example">
      <div className="mb-4 flex justify-between items-center">
        <h2>Multilingual Hero Component Example</h2>
        <LanguageSwitcher variant="buttons" />
      </div>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p>
          <strong>Current Language:</strong> {currentLanguage}
        </p>
        <p>
          <strong>Title Translation:</strong>{' '}
          {getTranslation('hero-1.title', currentLanguage, translations)}
        </p>
      </div>

      <DynamicComponentRenderer
        component={heroComponent}
        translations={translations}
        language={currentLanguage}
      />
    </div>
  )
}

// Example 2: Card Grid with multiple languages
export const MultilingualCardGridExample = () => {
  const cardGridComponent: DynamicComponent = {
    id: 'card-grid-1',
    name: 'Services Grid',
    slug: 'services-grid',
    supportsI18n: true,
    componentDefinition: {
      id: 'card-grid-def',
      name: 'Card Grid',
      slug: 'card-grid',
      category: 'layout' as const,
      fields: [
        {
          name: 'title',
          label: 'Section Title',
          type: 'text',
          required: true,
        },
        {
          name: 'cards',
          label: 'Cards',
          type: 'array',
          required: true,
          arrayFields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
    data: {
      title: 'Our Services',
      cards: [
        {
          title: 'Web Development',
          description: 'Custom web applications built with modern technologies',
        },
        {
          title: 'Mobile Apps',
          description: 'Native and cross-platform mobile applications',
        },
        {
          title: 'Consulting',
          description: 'Expert advice on technology and digital strategy',
        },
      ],
    },
  }

  const translations: Translation[] = [
    // Vietnamese translations
    {
      id: '7',
      key: 'card-grid-1.title',
      language: 'vi',
      value: 'Dịch vụ của chúng tôi',
      status: 'published',
    },
    {
      id: '8',
      key: 'card-grid-1.cards.0.title',
      language: 'vi',
      value: 'Phát triển Web',
      status: 'published',
    },
    {
      id: '9',
      key: 'card-grid-1.cards.0.description',
      language: 'vi',
      value: 'Ứng dụng web tùy chỉnh được xây dựng với công nghệ hiện đại',
      status: 'published',
    },
    {
      id: '10',
      key: 'card-grid-1.cards.1.title',
      language: 'vi',
      value: 'Ứng dụng Di động',
      status: 'published',
    },
    {
      id: '11',
      key: 'card-grid-1.cards.1.description',
      language: 'vi',
      value: 'Ứng dụng di động native và đa nền tảng',
      status: 'published',
    },
    {
      id: '12',
      key: 'card-grid-1.cards.2.title',
      language: 'vi',
      value: 'Tư vấn',
      status: 'published',
    },
    {
      id: '13',
      key: 'card-grid-1.cards.2.description',
      language: 'vi',
      value: 'Lời khuyên chuyên gia về công nghệ và chiến lược số',
      status: 'published',
    },
  ]

  return (
    <div className="multilingual-card-grid-example">
      <div className="mb-4">
        <h2>Multilingual Card Grid Example</h2>
        <LanguageSwitcher variant="dropdown" />
      </div>

      <DynamicComponentRenderer
        component={cardGridComponent}
        translations={translations}
        language={getCurrentLanguage()}
      />
    </div>
  )
}

// Example 3: How to create translations programmatically
export const createTranslationExample = () => {
  const createTranslation = (
    key: string,
    language: string,
    value: string,
    componentId?: string,
    fieldName?: string,
  ): Translation => ({
    id: Math.random().toString(36).substr(2, 9),
    key,
    language,
    value,
    componentType: 'dynamic-component',
    componentId,
    fieldName,
    status: 'draft',
  })

  // Example translations for a hero component
  const heroTranslations = [
    createTranslation('hero-2.title', 'vi', 'Chào mừng đến với trang web', 'hero-2', 'title'),
    createTranslation('hero-2.title', 'en', 'Welcome to our website', 'hero-2', 'title'),
    createTranslation(
      'hero-2.subtitle',
      'vi',
      'Khám phá những điều tuyệt vời',
      'hero-2',
      'subtitle',
    ),
    createTranslation('hero-2.subtitle', 'en', 'Discover amazing things', 'hero-2', 'subtitle'),
  ]

  return heroTranslations
}

// Example 4: Language-specific formatting
export const LanguageFormattingExample = () => {
  const { formatDate, formatCurrency, formatNumber } = require('@/utilities/i18n')

  const sampleDate = new Date('2024-01-15')
  const samplePrice = 1000000
  const sampleNumber = 1234567.89

  return (
    <div className="language-formatting-example">
      <h2>Language-specific Formatting</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3>Vietnamese (vi)</h3>
          <p>
            <strong>Date:</strong> {formatDate(sampleDate, 'vi')}
          </p>
          <p>
            <strong>Currency:</strong> {formatCurrency(samplePrice, 'vi')}
          </p>
          <p>
            <strong>Number:</strong> {formatNumber(sampleNumber, 'vi')}
          </p>
        </div>

        <div>
          <h3>English (en)</h3>
          <p>
            <strong>Date:</strong> {formatDate(sampleDate, 'en')}
          </p>
          <p>
            <strong>Currency:</strong> {formatCurrency(samplePrice, 'en')}
          </p>
          <p>
            <strong>Number:</strong> {formatNumber(sampleNumber, 'en')}
          </p>
        </div>
      </div>
    </div>
  )
}

// Example 5: Complete multilingual page
export const MultilingualPageExample = () => {
  return (
    <div className="multilingual-page-example">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1>Multilingual Page Example</h1>
          <LanguageSwitcher variant="buttons" showFlags={true} showNativeNames={true} />
        </div>
      </header>

      <main className="space-y-8">
        <MultilingualHeroExample />
        <MultilingualCardGridExample />
        <LanguageFormattingExample />
      </main>
    </div>
  )
}
