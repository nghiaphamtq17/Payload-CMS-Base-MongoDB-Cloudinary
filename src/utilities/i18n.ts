import type { Language, Translation } from '@/types/temp-types'

// Default language configuration
export const DEFAULT_LANGUAGE = 'vi'
export const SUPPORTED_LANGUAGES = ['vi', 'en'] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

// Language configuration
export const LANGUAGE_CONFIG: Record<
  SupportedLanguage,
  {
    name: string
    nativeName: string
    flag: string
    direction: 'ltr' | 'rtl'
    dateFormat: string
    currency: string
  }
> = {
  vi: {
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    currency: 'VND',
  },
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
  },
}

// Translation cache
let translationCache: Map<string, Translation[]> = new Map()

/**
 * Get current language from URL or localStorage
 */
export const getCurrentLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE

  // Try to get from URL path
  const path = window.location.pathname
  const pathLang = path.split('/')[1]
  if (SUPPORTED_LANGUAGES.includes(pathLang as SupportedLanguage)) {
    return pathLang as SupportedLanguage
  }

  // Try to get from localStorage
  const storedLang = localStorage.getItem('language')
  if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang as SupportedLanguage)) {
    return storedLang as SupportedLanguage
  }

  // Try to get from browser language
  const browserLang = navigator.language.split('-')[0]
  if (SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)) {
    return browserLang as SupportedLanguage
  }

  return DEFAULT_LANGUAGE
}

/**
 * Set current language
 */
export const setCurrentLanguage = (language: SupportedLanguage): void => {
  if (typeof window === 'undefined') return

  localStorage.setItem('language', language)

  // Update URL if needed
  const currentPath = window.location.pathname
  const pathParts = currentPath.split('/')
  const currentLang = pathParts[1]

  if (SUPPORTED_LANGUAGES.includes(currentLang as SupportedLanguage)) {
    pathParts[1] = language
    const newPath = pathParts.join('/')
    window.history.replaceState({}, '', newPath)
  }
}

/**
 * Get translation by key and language
 */
export const getTranslation = (
  key: string,
  language: SupportedLanguage = getCurrentLanguage(),
  translations: Translation[] = [],
): string => {
  const translation = translations.find(
    (t) => t.key === key && t.language === language && t.status === 'published',
  )

  return translation?.value || key
}

/**
 * Get all translations for a language
 */
export const getTranslationsForLanguage = (
  language: SupportedLanguage,
  translations: Translation[] = [],
): Record<string, string> => {
  return translations
    .filter((t) => t.language === language && t.status === 'published')
    .reduce(
      (acc, t) => {
        acc[t.key] = t.value
        return acc
      },
      {} as Record<string, string>,
    )
}

/**
 * Format date according to language
 */
export const formatDate = (
  date: Date | string,
  language: SupportedLanguage = getCurrentLanguage(),
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const config = LANGUAGE_CONFIG[language]

  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObj)
}

/**
 * Format currency according to language
 */
export const formatCurrency = (
  amount: number,
  language: SupportedLanguage = getCurrentLanguage(),
): string => {
  const config = LANGUAGE_CONFIG[language]

  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: config.currency,
  }).format(amount)
}

/**
 * Format number according to language
 */
export const formatNumber = (
  number: number,
  language: SupportedLanguage = getCurrentLanguage(),
): string => {
  return new Intl.NumberFormat(language).format(number)
}

/**
 * Get language direction
 */
export const getLanguageDirection = (
  language: SupportedLanguage = getCurrentLanguage(),
): 'ltr' | 'rtl' => {
  return LANGUAGE_CONFIG[language].direction
}

/**
 * Check if language is RTL
 */
export const isRTL = (language: SupportedLanguage = getCurrentLanguage()): boolean => {
  return getLanguageDirection(language) === 'rtl'
}

/**
 * Generate translation key for component field
 */
export const generateTranslationKey = (
  componentId: string,
  fieldName: string,
  customKey?: string,
): string => {
  return customKey || `${componentId}.${fieldName}`
}

/**
 * Get missing translations for a language
 */
export const getMissingTranslations = (
  language: SupportedLanguage,
  allTranslations: Translation[],
): string[] => {
  const languageTranslations = allTranslations.filter((t) => t.language === language)
  const otherLanguageTranslations = allTranslations.filter((t) => t.language !== language)

  const missingKeys: string[] = []

  otherLanguageTranslations.forEach((translation) => {
    const exists = languageTranslations.some((t) => t.key === translation.key)
    if (!exists) {
      missingKeys.push(translation.key)
    }
  })

  return missingKeys
}

/**
 * Get translation progress for a language
 */
export const getTranslationProgress = (
  language: SupportedLanguage,
  allTranslations: Translation[],
): { completed: number; total: number; percentage: number } => {
  const allKeys = [...new Set(allTranslations.map((t) => t.key))]
  const languageKeys = allTranslations
    .filter((t) => t.language === language && t.status === 'published')
    .map((t) => t.key)

  const completed = languageKeys.length
  const total = allKeys.length
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return { completed, total, percentage }
}
