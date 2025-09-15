import { useCallback } from 'react'
import { adminTranslations, type AdminLanguage, type AdminTranslationKey } from '@/locales/admin'
import { getCurrentLanguage } from '@/utilities/i18n'

/**
 * Hook để sử dụng admin translations
 */
export const useAdminTranslation = () => {
  const currentLanguage = getCurrentLanguage() as AdminLanguage
  const translations = adminTranslations[currentLanguage] || adminTranslations.vi

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const keys = key.split('.')
      let value: any = translations

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return fallback || key
        }
      }

      return typeof value === 'string' ? value : fallback || key
    },
    [translations],
  )

  return {
    t,
    language: currentLanguage,
    translations,
  }
}

/**
 * Utility function để get admin translation
 */
export const getAdminTranslation = (
  key: string,
  language?: AdminLanguage,
  fallback?: string,
): string => {
  const lang = language || (getCurrentLanguage() as AdminLanguage)
  const translations = adminTranslations[lang] || adminTranslations.vi

  const keys = key.split('.')
  let value: any = translations

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return fallback || key
    }
  }

  return typeof value === 'string' ? value : fallback || key
}

/**
 * Get all translations for a specific language
 */
export const getAdminTranslations = (language: AdminLanguage = 'vi') => {
  return adminTranslations[language] || adminTranslations.vi
}
