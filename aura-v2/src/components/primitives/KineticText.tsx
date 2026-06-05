import { motion } from 'framer-motion'

type KineticTextProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
}

/** Letter-by-letter slide-up reveal from behind a mask (on scroll-into-view). */
export function KineticText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  once = true,
}: KineticTextProps) {
  const letters = Array.from(text)
  return (
    <span className={className} aria-label={text} style={{ display: 'inline-block' }}>
      {letters.map((ch, i) =>
        ch === ' ' ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            aria-hidden
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: '115%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once }}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
            >
              {ch}
            </motion.span>
          </span>
        ),
      )}
    </span>
  )
}
