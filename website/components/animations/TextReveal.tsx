'use client'

import { useRef, ReactNode } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  splitBy?: 'word' | 'character' | 'line'
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
}

const childVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

export function TextReveal({
  children,
  className,
  delay = 0,
  once = true,
  splitBy = 'word',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-100px' })

  if (typeof children !== 'string') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  const text = children as string

  let items: string[] = []
  if (splitBy === 'word') {
    items = text.split(' ')
  } else if (splitBy === 'character') {
    items = text.split('')
  } else {
    items = text.split('\n')
  }

  return (
    <motion.div
      ref={ref}
      className={cn('overflow-hidden', className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : undefined}
      transition={{ delay }}
    >
      {items.map((item, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={childVariants}>
            {item}
            {splitBy === 'word' && index < items.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}
