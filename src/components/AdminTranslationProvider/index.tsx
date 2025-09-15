import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentLanguage, setCurrentLanguage, type SupportedLanguage } from '@/utilities/i18n'
import { adminTranslations, type AdminLanguage } from '@/locales/admin'

interface AdminTranslationContextType {
  language: AdminLanguage
  setLanguage: (lang: AdminLanguage) => void
  t: (key: string, fallback?: string) => string
  translations: typeof adminTranslations.vi
}

const AdminTranslationContext = createContext<AdminTranslationContextType | undefined>(undefined)

interface AdminTranslationProviderProps {
  children: React.ReactNode
}

export const AdminTranslationProvider: React.FC<AdminTranslationProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<AdminLanguage>('vi')

  useEffect(() => {
    const currentLang = getCurrentLanguage() as AdminLanguage
    setLanguageState(currentLang)
  }, [])

  const setLanguage = (lang: AdminLanguage) => {
    setCurrentLanguage(lang as SupportedLanguage)
    setLanguageState(lang)
  }

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.')
    let value: any = adminTranslations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return fallback || key
      }
    }

    return typeof value === 'string' ? value : fallback || key
  }

  const value: AdminTranslationContextType = {
    language,
    setLanguage,
    t,
    translations: adminTranslations[language],
  }

  return (
    <AdminTranslationContext.Provider value={value}>{children}</AdminTranslationContext.Provider>
  )
}

export const useAdminTranslation = (): AdminTranslationContextType => {
  const context = useContext(AdminTranslationContext)
  if (context === undefined) {
    throw new Error('useAdminTranslation must be used within an AdminTranslationProvider')
  }
  return context
}
