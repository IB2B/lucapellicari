'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CounterProps {
  value: number
  className?: string
  prefix?: string
  suffix?: string
  duration?: number
  once?: boolean
}

export function Counter({
  value,
  className,
  prefix = '',
  suffix = '',
  duration = 2,
  once = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  })

  const display = useTransform(spring, (latest) =>
    Math.round(latest).toLocaleString('it-IT')
  )

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value)
      setHasAnimated(true)
    }
  }, [isInView, value, spring, hasAnimated])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
