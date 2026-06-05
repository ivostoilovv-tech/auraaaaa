import { motion } from 'framer-motion'

type BlurTextProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
  y?: string
}

/** Word-by-word blur-in reveal (Framer Motion), triggered on view. */
export function BlurText({
  text,
  className,
  delay = 0,
  stagger = 0.08,
  once = true,
  y = '0.4em',
}: BlurTextProps) {
  const words = text.split(' ')
  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ opacity: 0, filter: 'blur(12px)', y }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once }}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  )
}
