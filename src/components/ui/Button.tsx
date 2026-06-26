import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

type Variant = 'primary' | 'secondary' | 'dark' | 'ghost' | 'lime'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: Variant
  className?: string
  style?: CSSProperties
  type?: 'button' | 'submit'
  ariaLabel?: string
  full?: boolean
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-electric text-milk hover:brightness-110 shadow-soft',
  secondary: 'bg-milk text-ink border border-ink/10 hover:border-ink/30 shadow-soft',
  dark: 'bg-ink text-milk hover:bg-navy shadow-soft',
  lime: 'bg-lime text-ink hover:brightness-105 shadow-soft',
  ghost: 'bg-transparent text-ink border border-ink/20 hover:bg-ink hover:text-milk',
}

export function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  style,
  type = 'button',
  ariaLabel,
  full = false,
}: ButtonProps) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold tracking-tight transition-[filter,background-color,border-color,color] duration-200 ${
    full ? 'w-full' : ''
  } ${VARIANTS[variant]} ${className}`

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.96, y: 0 },
    transition: { type: 'spring' as const, stiffness: 500, damping: 30 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        className={classes}
        style={style}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      style={style}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
