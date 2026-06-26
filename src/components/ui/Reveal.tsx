import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  /** Stagger children that are direct motion items wrapped with RevealItem */
  stagger?: boolean
  as?: 'div' | 'section' | 'ul' | 'li'
}

export function Reveal({ children, className, delay = 0, y = 28, stagger = false }: RevealProps) {
  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

interface RevealItemProps {
  children: ReactNode
  className?: string
}

export function RevealItem({ children, className }: RevealItemProps) {
  return (
    <motion.div className={className} variants={revealItem}>
      {children}
    </motion.div>
  )
}
