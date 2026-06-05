import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useLang } from '../../i18n/LanguageContext'

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => Math.round(v).toString())

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, value, mv])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-[clamp(2.8rem,7vw,5rem)] font-semibold leading-none text-text">
        <motion.span>{text}</motion.span>
        <span className="text-clay">{suffix}</span>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.14em] text-text-mute sm:text-sm">
        {label}
      </p>
    </div>
  )
}

export function Metrics() {
  const { t } = useLang()
  return (
    <section className="relative bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 px-5 sm:px-8 lg:grid-cols-4">
        {t.metrics.items.map((m) => (
          <Stat key={m.label} value={m.value} suffix={m.suffix} label={m.label} />
        ))}
      </div>
    </section>
  )
}
