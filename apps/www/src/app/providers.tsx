'use client'

import { Toaster, TooltipProvider } from '@fintrack/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { type ReactNode, useState } from 'react'

const Providers = (props: { children: ReactNode }) => {
  // eslint-disable-next-line @eslint-react/naming-convention/use-state -- This is a valid use case
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 // Data remains fresh for 1 minute
          }
        }
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        enableColorScheme
        disableTransitionOnChange
      >
        <TooltipProvider>
          {props.children}
          <Toaster toastOptions={{ duration: 2500 }} visibleToasts={5} expand />
        </TooltipProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
