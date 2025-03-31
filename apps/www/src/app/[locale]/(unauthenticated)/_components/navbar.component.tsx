'use client'

import { useTranslations } from '@fintrack/i18n/client'
import { usePathname } from '@fintrack/i18n/routing'
import { cn } from '@fintrack/utils'
import { motion } from 'framer-motion'
import {
  Briefcase,
  ChartNoAxesCombined,
  DollarSign,
  Home,
  LogIn,
  type LucideIcon
} from 'lucide-react'
import React, { type JSX, useState } from 'react'

import { Link } from '@/components/link'

type NavItem = {
  name: string
  url: string
  icon: LucideIcon
}

export function NavBarComponent(props: Readonly<{ isAuthenticated: boolean }>): JSX.Element {
  const t = useTranslations()
  const navItems: NavItem[] = [
    { name: t('unauthenticated-layout.navbar.home'), url: '/', icon: Home },
    {
      name: t('unauthenticated-layout.navbar.pricing'),
      url: '/pricing',
      icon: DollarSign
    },
    {
      name: t('unauthenticated-layout.navbar.about'),
      url: '/about',
      icon: Briefcase
    },
    ...(props.isAuthenticated
      ? [
          {
            name: t('unauthenticated-layout.navbar.dashboard'),
            url: '/dashboard',
            icon: ChartNoAxesCombined
          }
        ]
      : [
          {
            name: t('unauthenticated-layout.navbar.sign-in-or-sign-up'),
            url: '/sign-in',
            icon: LogIn
          }
        ])
  ]
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(
    navItems.find((item) => item.url === pathname)?.name ?? ''
  )

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768)
  //   }

  //   handleResize()
  //   window.addEventListener('resize', handleResize)
  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])

  return (
    <div
      className={cn('fixed bottom-0 left-1/2 z-50 mb-3 w-fit -translate-x-1/2 sm:top-0 sm:pt-3')}
    >
      <div className='bg-primary/5 border-border flex w-fit items-center gap-3 rounded-lg border px-1 py-1 shadow-lg backdrop-blur-lg'>
        {navItems.map((item) => {
          const isActive = activeTab === item.name
          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                'relative flex w-fit cursor-pointer flex-row items-center justify-center gap-2 rounded-lg px-6 py-2 text-sm font-semibold text-nowrap transition-colors',
                'text-foreground/80 hover:text-white',
                isActive && 'bg-primary/5 text-foreground'
              )}
            >
              <item.icon size={18} strokeWidth={2} className='md:hidden' />
              <span className='hidden w-fit md:flex'>{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId='lamp'
                  className='bg-primary/5 absolute inset-0 -z-10 w-full rounded-lg'
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                  }}
                >
                  <div className='bg-primary absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full'>
                    <div className='bg-primary/10 absolute -top-2 -left-2 h-6 w-12 rounded-lg blur-md' />
                    <div className='bg-primary/10 absolute -top-1 h-6 w-8 rounded-lg blur-md' />
                    <div className='bg-primary/10 absolute top-0 left-2 h-4 w-4 rounded-lg blur-sm' />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
