'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  speed?: number
  scale?: boolean
  priority?: boolean
}

export function ParallaxImage({
  src,
  alt,
  className,
  containerClassName,
  speed = 0.5,
  scale = true,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 30}%`])
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1, scale ? 1.1 : 1, 1])

  return (
    <div
      ref={ref}
      className={cn('overflow-hidden relative', containerClassName)}
    >
      <motion.div
        style={{ y, scale: scaleValue }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn('object-cover', className)}
          priority={priority}
          quality={70}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </div>
  )
}
