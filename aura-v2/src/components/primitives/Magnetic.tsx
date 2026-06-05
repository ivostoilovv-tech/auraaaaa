import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

/** Element subtly follows the cursor when hovered — magnetic pull. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = e.clientX - (rect.left + rect.width / 2)
    const my = e.clientY - (rect.top + rect.height / 2)
    x.set(mx * strength)
    y.set(my * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  )
}
