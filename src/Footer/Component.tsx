import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const columns = footerData?.columns || []
  const layout = footerData?.layout || {}
  const showLogo = footerData?.showLogo ?? true
  const logo = footerData?.logo
  const logoHref = footerData?.logoHref || '/'
  const showTheme = footerData?.layout?.showThemeSwitcher ?? true

  const columnsOnMobile = Number(layout?.columnsOnMobile || 1)
  const columnsOnDesktop = Number(layout?.columnsOnDesktop || 3)

  const mobileGrid = columnsOnMobile === 2 ? 'grid-cols-2' : 'grid-cols-1'
  const desktopGrid = `md:grid-cols-${columnsOnDesktop}`

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-10 flex flex-col gap-8">
        <div className="flex items-start justify-between gap-4">
          {showLogo && (
            <Link className="flex items-center" href={logoHref}>
              {logo && typeof logo !== 'string' && logo?.url ? (
                <Image
                  src={logo.url}
                  alt={logo.alt || 'Footer Logo'}
                  width={logo.width || 140}
                  height={logo.height || 40}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <Logo />
              )}
            </Link>
          )}

          {showTheme && (
            <div className="ml-auto">
              <ThemeSelector />
            </div>
          )}
        </div>

        {/* Columns */}
        {columns?.length > 0 && (
          <div className={`grid ${mobileGrid} ${desktopGrid} gap-8`}>
            {columns.map((col: any, idx: number) => {
              const maxMobile = Number(col?.maxItemsMobile || 6)
              const maxDesktop = Number(col?.maxItemsDesktop || 8)
              const items = Array.isArray(col?.items) ? col.items : []
              const itemsMobile = items.slice(0, maxMobile)
              const itemsDesktop = items.slice(0, maxDesktop)

              return (
                <div key={idx}>
                  {col?.title && (
                    <div className="mb-3 font-semibold uppercase tracking-wide text-sm opacity-80">
                      {col.title}
                    </div>
                  )}
                  {/* mobile */}
                  <div className="md:hidden flex flex-col gap-2">
                    {itemsMobile.map(({ link }: any, i: number) => (
                      <CMSLink className="text-white/80 hover:text-white" key={i} {...link} />
                    ))}
                  </div>
                  {/* desktop */}
                  <div className="hidden md:flex flex-col gap-2">
                    {itemsDesktop.map(({ link }: any, i: number) => (
                      <CMSLink className="text-white/80 hover:text-white" key={i} {...link} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* No fallback needed; columns are the single source of truth */}
      </div>
    </footer>
  )
}
