'use client'

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight, Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  isLoading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  arrow?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-dark hover:bg-gold-light hover:shadow-glow',
  secondary: 'bg-transparent text-gold border border-gold hover:bg-gold hover:text-dark',
  ghost: 'bg-transparent text-light-surface hover:text-gold hover:bg-dark-lighter',
  outline: 'bg-transparent text-light-surface border border-light-surface/20 hover:border-gold hover:text-gold',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      href,
      isLoading,
      icon,
      iconPosition = 'left',
      arrow,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2 font-sans font-medium',
      'rounded-sm transition-all duration-300 ease-out-expo',
      'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-dark',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variants[variant],
      sizes[size],
      className
    )

    const content = (
      <>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && icon && iconPosition === 'left' && icon}
        <span>{children}</span>
        {!isLoading && icon && iconPosition === 'right' && icon}
        {!isLoading && arrow && (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
      </>
    )

    if (href) {
      return (
        <Link href={href} className={cn(baseStyles, 'group')}>
          {content}
        </Link>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, 'group')}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {content}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
