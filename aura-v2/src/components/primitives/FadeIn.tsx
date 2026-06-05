import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  blur?: number
  duration?: number
  once?: boolean
}

/** Soft blur + rise on scroll-into-view. The signature Aura entrance. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  blur = 8,
  duration = 0.85,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
