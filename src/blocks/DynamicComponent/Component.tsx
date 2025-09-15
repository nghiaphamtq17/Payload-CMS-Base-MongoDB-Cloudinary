import React from 'react'
import { cn } from '@/utilities/ui'
import { DynamicComponentRenderer } from '@/components/DynamicComponentRenderer'

import type { DynamicComponentBlock as DynamicComponentBlockProps } from '@/payload-types'

export const DynamicComponentBlock: React.FC<DynamicComponentBlockProps> = (props) => {
  const { component, customClassName, customStyles, containerSettings } = props

  if (!component || typeof component === 'string') {
    return null
  }

  const {
    disableInnerContainer = false,
    maxWidth = 'container',
    padding = 'p-4',
  } = containerSettings || {}

  const containerClasses = cn(
    'dynamic-component-block',
    maxWidth !== 'full' && maxWidth,
    padding,
    customClassName,
  )

  const inlineStyles =
    customStyles && typeof customStyles === 'object'
      ? (customStyles as React.CSSProperties)
      : undefined

  return (
    <div className={containerClasses} style={inlineStyles}>
      <DynamicComponentRenderer
        component={component}
        disableInnerContainer={disableInnerContainer}
      />
    </div>
  )
}
