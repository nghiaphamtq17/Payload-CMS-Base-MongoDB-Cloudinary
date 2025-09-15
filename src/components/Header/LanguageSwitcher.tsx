'use client'

import React from 'react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export const HeaderLanguageSwitcher: React.FC = () => {
  return (
    <div className="header-language-switcher">
      <LanguageSwitcher
        variant="dropdown"
        showFlags={true}
        showNativeNames={true}
        className="text-sm"
      />
    </div>
  )
}
