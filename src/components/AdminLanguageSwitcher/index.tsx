'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'
import {
  getCurrentLanguage,
  setCurrentLanguage,
  SUPPORTED_LANGUAGES,
  LANGUAGE_CONFIG,
  type SupportedLanguage,
} from '@/utilities/i18n'

interface AdminLanguageSwitcherProps {
  className?: string
  showFlags?: boolean
  showNativeNames?: boolean
  variant?: 'dropdown' | 'buttons' | 'select'
  onLanguageChange?: (language: SupportedLanguage) => void
}

export const AdminLanguageSwitcher: React.FC<AdminLanguageSwitcherProps> = ({
  className,
  showFlags = true,
  showNativeNames = true,
  variant = 'dropdown',
  onLanguageChange,
}) => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('vi')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const handleLanguageChange = (language: SupportedLanguage) => {
    setCurrentLanguage(language)
    setCurrentLang(language)
    setIsOpen(false)
    onLanguageChange?.(language)

    // Reload page to apply language changes
    window.location.reload()
  }

  const currentConfig = LANGUAGE_CONFIG[currentLang]

  if (variant === 'select') {
    return (
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
        className={cn(
          'px-3 py-2 border border-gray-300 rounded-md bg-white text-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          'admin-language-switcher',
          className,
        )}
      >
        {SUPPORTED_LANGUAGES.map((lang) => {
          const config = LANGUAGE_CONFIG[lang]
          return (
            <option key={lang} value={lang}>
              {showFlags && config.flag} {showNativeNames ? config.nativeName : config.name}
            </option>
          )
        })}
      </select>
    )
  }

  if (variant === 'buttons') {
    return (
      <div className={cn('flex gap-2', className)}>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const config = LANGUAGE_CONFIG[lang]
          const isActive = lang === currentLang

          return (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
                'admin-language-button',
                isActive
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-white text-gray-700 border border-gray-300',
              )}
            >
              {showFlags && config.flag} {showNativeNames ? config.nativeName : config.name}
            </button>
          )
        })}
      </div>
    )
  }

  // Dropdown variant (default)
  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium',
          'bg-white border border-gray-300 hover:bg-gray-50',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          'admin-language-dropdown-trigger',
        )}
      >
        {showFlags && currentConfig.flag}
        <span>{showNativeNames ? currentConfig.nativeName : currentConfig.name}</span>
        <svg
          className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20 admin-language-dropdown">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const config = LANGUAGE_CONFIG[lang]
              const isActive = lang === currentLang

              return (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-left text-sm',
                    'hover:bg-gray-50 focus:outline-none focus:bg-gray-50',
                    'admin-language-dropdown-item',
                    isActive && 'bg-blue-50 text-blue-700',
                  )}
                >
                  {showFlags && config.flag}
                  <span>{showNativeNames ? config.nativeName : config.name}</span>
                  {isActive && (
                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
