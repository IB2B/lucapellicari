'use client'

import { ReactNode } from 'react'
import { TextReveal } from '@/components/animations/TextReveal'
import { FadeIn } from '@/components/animations/FadeIn'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  description?: string | ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
  light?: boolean
}

export function SectionHeading({
  title,
  subtitle,
  description,
  align = 'center',
  className,
  light = false,
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  return (
    <div className={cn('max-w-3xl mb-16', alignClasses[align], className)}>
      {subtitle && (
        <FadeIn delay={0}>
          <span
            className={cn(
              'inline-block text-sm font-medium uppercase tracking-widest mb-4',
              light ? 'text-teal' : 'text-gold'
            )}
          >
            {subtitle}
          </span>
        </FadeIn>
      )}

      <TextReveal delay={0.1}>
        <h2
          className={cn(
            'heading-section',
            light ? 'text-dark' : 'text-light-surface'
          )}
        >
          {title}
        </h2>
      </TextReveal>

      {description && (
        <FadeIn delay={0.3}>
          <div
            className={cn(
              'mt-6 text-lg leading-relaxed',
              light ? 'text-dark/70' : 'text-light-surface/70'
            )}
          >
            {typeof description === 'string' ? <p>{description}</p> : description}
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.4} className={align === 'center' ? 'flex justify-center' : ''}>
        <div className="divider mt-8" />
      </FadeIn>
    </div>
  )
}
