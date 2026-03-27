'use client'

import { useEffect, useLayoutEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

const useIsomorphicLayout = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useIsomorphicLayout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return <>{children}</>
}
