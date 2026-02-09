'use client'

import { useRef, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface FadeInProps {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
}

const getInitialPosition = (direction: Direction) => {
  switch (direction) {
    case 'up':
      return { opacity: 0, y: 40 }
    case 'down':
      return { opacity: 0, y: -40 }
    case 'left':
      return { opacity: 0, x: 40 }
    case 'right':
      return { opacity: 0, x: -40 }
    case 'none':
    default:
      return { opacity: 0 }
  }
}

const getFinalPosition = (direction: Direction) => {
  switch (direction) {
    case 'up':
    case 'down':
      return { opacity: 1, y: 0 }
    case 'left':
    case 'right':
      return { opacity: 1, x: 0 }
    case 'none':
    default:
      return { opacity: 1 }
  }
}

export function FadeIn({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={getInitialPosition(direction)}
      animate={isInView ? getFinalPosition(direction) : getInitialPosition(direction)}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
