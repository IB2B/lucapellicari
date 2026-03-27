'use client'

import { useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Force scroll to top immediately on every route change
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return <>{children}</>
}
