/**
 * Admin i18n Usage Examples
 *
 * This file demonstrates how to use admin translations in Payload CMS
 */

import React from 'react'
import { AdminLanguageSwitcher } from '@/components/AdminLanguageSwitcher'
import { useAdminTranslation } from '@/components/AdminTranslationProvider'

// Example 1: Using admin translations in a component
export const AdminTranslationExample = () => {
  const { t, language } = useAdminTranslation()

  return (
    <div className="admin-translation-example p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {t('nav.dashboard')} - {language.toUpperCase()}
        </h2>
        <AdminLanguageSwitcher variant="buttons" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('actions.create')}</h3>
          <div className="space-y-2">
            <p>
              <strong>{t('form.title')}:</strong> {t('messages.info.loading')}
            </p>
            <p>
              <strong>{t('form.description')}:</strong> {t('messages.info.noData')}
            </p>
            <p>
              <strong>{t('form.status')}:</strong> {t('status.draft')}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('collections.pages.label')}</h3>
          <div className="space-y-2">
            <p>
              <strong>{t('collections.pages.singular')}:</strong>{' '}
              {t('collections.pages.description')}
            </p>
            <p>
              <strong>{t('collections.posts.singular')}:</strong>{' '}
              {t('collections.posts.description')}
            </p>
            <p>
              <strong>{t('collections.media.singular')}:</strong>{' '}
              {t('collections.media.description')}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">{t('messages.success.created')}</h3>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {t('messages.success.created')} - {t('messages.success.updated')}
        </div>
      </div>
    </div>
  )
}

// Example 2: Form with translated labels
export const AdminFormExample = () => {
  const { t } = useAdminTranslation()

  return (
    <div className="admin-form-example p-6">
      <h2 className="text-xl font-bold mb-4">
        {t('actions.create')} {t('collections.pages.singular')}
      </h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('form.title')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('form.title')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('form.slug')}</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('form.slug')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('form.description')}</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder={t('form.description')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('form.category')}</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">{t('messages.info.selectCategory')}</option>
            <option value="tech">{t('collections.categories.singular')} 1</option>
            <option value="news">{t('collections.categories.singular')} 2</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t('actions.save')}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {t('actions.cancel')}
          </button>
        </div>
      </form>
    </div>
  )
}

// Example 3: Status indicators with translations
export const AdminStatusExample = () => {
  const { t } = useAdminTranslation()

  const statuses = [
    { key: 'draft', color: 'bg-yellow-100 text-yellow-800' },
    { key: 'published', color: 'bg-green-100 text-green-800' },
    { key: 'archived', color: 'bg-gray-100 text-gray-800' },
    { key: 'active', color: 'bg-blue-100 text-blue-800' },
    { key: 'inactive', color: 'bg-red-100 text-red-800' },
  ]

  return (
    <div className="admin-status-example p-6">
      <h2 className="text-xl font-bold mb-4">{t('form.status')}</h2>

      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <span
            key={status.key}
            className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
          >
            {t(`status.${status.key}`)}
          </span>
        ))}
      </div>
    </div>
  )
}

// Example 4: Collection list with translations
export const AdminCollectionListExample = () => {
  const { t } = useAdminTranslation()

  const collections = [
    'pages',
    'posts',
    'media',
    'categories',
    'skills',
    'skillCategories',
    'users',
    'custom',
    'componentDefinitions',
    'dynamicComponents',
    'languages',
    'translations',
  ]

  return (
    <div className="admin-collection-list p-6">
      <h2 className="text-xl font-bold mb-4">{t('nav.dashboard')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <div
            key={collection}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold mb-2">{t(`collections.${collection}.label`)}</h3>
            <p className="text-sm text-gray-600 mb-3">
              {t(`collections.${collection}.description`)}
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                {t('actions.create')}
              </button>
              <button className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600">
                {t('actions.edit')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Example 5: Complete admin dashboard
export const AdminDashboardExample = () => {
  return (
    <div className="admin-dashboard-example">
      <AdminTranslationExample />
      <hr className="my-8" />
      <AdminFormExample />
      <hr className="my-8" />
      <AdminStatusExample />
      <hr className="my-8" />
      <AdminCollectionListExample />
    </div>
  )
}
