import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../../i18n/LanguageContext'
import { LiquidCanvas } from '../primitives/LiquidCanvas'
import { useIsDesktop } from '../../lib/useIsDesktop'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * A small editorial quote floating over soft marble — intentionally lighter
 * than a classic "reviews" section: one voice at a time, lots of air.
 */
export function Testimonials() {
  const { t } = useLang()
  const isDesktop = useIsDesktop()
  const items = t.testimonials.items
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 7000)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-28">
      {/* Marble band — fades to cream at both edges so the page stays one canvas */}
      <div className="absolute inset-0">
        <img
          src="assets/quote-marble.jpg"
          alt=""
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        {isDesktop ? (
          <LiquidCanvas
            src="assets/quote-marble.jpg"
            flow={0.45}
            intensity={0.7}
            className="absolute inset-0 h-full w-full"
          />
        ) : null}
        <div className="absolute inset-0 bg-cream/40" />
        <div className="absolute inset-x-0 top-0 h-[26%] bg-gradient-to-b from-cream to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-cream to-transparent" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-display text-6xl leading-none text-clay/70"
          aria-hidden="true"
        >
          “
        </motion.span>

        <div className="relative mt-2 min-h-[170px] sm:min-h-[150px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="font-display text-[clamp(1.3rem,2.6vw,1.9rem)] font-medium italic leading-snug text-ink">
                {items[i].quote}
              </p>
              <footer className="mt-7">
                <span className="mx-auto mb-4 block h-px w-10 bg-clay/50" />
                <div className="text-sm font-semibold text-ink">{items[i].name}</div>
                <div className="mt-0.5 text-xs text-text-mute">{items[i].role}</div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, d) => (
            <button
              key={d}
              onClick={() => setI(d)}
              aria-label={`Quote ${d + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                d === i ? 'w-6 bg-clay' : 'w-1.5 bg-coal/25 hover:bg-coal/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
