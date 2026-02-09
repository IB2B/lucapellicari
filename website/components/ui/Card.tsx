'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        'bg-dark-surface rounded-lg p-6 border border-dark-lighter',
        hover && 'transition-all duration-300 hover:border-gold/30 hover:shadow-inner-glow',
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
    >
      {children}
    </motion.div>
  )
}

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  href?: string
  className?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
  className,
}: FeatureCardProps) {
  const content = (
    <>
      <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-6 text-gold">
        {icon}
      </div>
      <h3 className="font-serif text-xl font-semibold text-light-surface mb-3">
        {title}
      </h3>
      <p className="text-light-surface/70 leading-relaxed">{description}</p>
      {href && (
        <div className="mt-4 flex items-center text-gold font-medium group-hover:translate-x-2 transition-transform">
          <span>Scopri di più</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className="group">
        <Card className={cn('h-full', className)}>{content}</Card>
      </Link>
    )
  }

  return <Card className={className}>{content}</Card>
}

interface ImageCardProps {
  src: string
  alt: string
  title: string
  subtitle?: string
  href?: string
  className?: string
}

export function ImageCard({
  src,
  alt,
  title,
  subtitle,
  href,
  className,
}: ImageCardProps) {
  const content = (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="aspect-[4/5] relative">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {subtitle && (
          <span className="text-gold text-sm font-medium mb-2 block">
            {subtitle}
          </span>
        )}
        <h3 className="font-serif text-2xl font-semibold text-light-surface">
          {title}
        </h3>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return <div className={className}>{content}</div>
}
