'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const showLogo = (data as any)?.showLogo ?? true
  const logo = (data as any)?.logo
  const logoHref = (data as any)?.logoHref || '/'
  const logoHeight = Number((data as any)?.logoHeight || 32)
  const logoWidth = Number((data as any)?.logoWidth || 120)

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">
        {showLogo && (
          <Link href={logoHref}>
            {logo && typeof logo !== 'string' && logo?.url ? (
              <Image
                src={logo.url}
                alt={logo.alt || 'Header Logo'}
                width={logoWidth}
                height={logoHeight}
                className="h-8 w-auto object-contain invert dark:invert-0"
                priority
              />
            ) : (
              <Logo loading="eager" priority="high" className="invert dark:invert-0" />
            )}
          </Link>
        )}
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
