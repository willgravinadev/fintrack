import type { JSX } from 'react'

import { Link as LocalizedLink } from '@fintrack/i18n/routing'
import NextLink from 'next/link'

type LinkProps = React.ComponentProps<'a'>

export const Link = (props: LinkProps): JSX.Element => {
  const { href, children, ...rest } = props

  if (!href) {
    throw new Error('Link must have an href')
  }

  if (href.startsWith('http')) {
    return (
      <NextLink target='_blank' rel='noopener noreferrer' href={href} {...rest}>
        {children}
      </NextLink>
    )
  }

  return (
    <LocalizedLink href={href} {...rest}>
      {children}
    </LocalizedLink>
  )
}
