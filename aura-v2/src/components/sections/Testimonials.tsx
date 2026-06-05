import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'

const TINTS = ['#fbeae4', '#eef2ef', '#fbf3dd']

export function Testimonials() {
  const { t } = useLang()
  const items = t.testimonials.items
  const [i, setI] = useState(0)

  const next = () => setI((p) => (p + 1) % items.length)
  const prev = () => setI((p) => (p - 1 + items.length) % items.length)

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 6000)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <section
      className="relative overflow-hidden py-24 transition-colors duration-700 sm:py-32"
      style={{ backgroundColor: TINTS[i] }}
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.22em] text-clay">
          {t.testimonials.kicker}
        </p>
        <Quote className="mx-auto mb-6 text-clay/40" size={44} />
        <div className="relative min-h-[230px] sm:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-[clamp(1.35rem,3.2vw,2.4rem)] font-medium leading-snug text-text">
                “{items[i].quote}”
              </p>
              <footer className="mt-8">
                <div className="font-semibold text-text">{items[i].name}</div>
                <div className="text-sm text-text-mute">{items[i].role}</div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous"
            className="grid h-11 w-11 place-items-center rounded-full border border-coal/15 text-coal transition-colors hover:border-clay hover:text-clay"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex gap-2">
            {items.map((_, d) => (
              <button
                key={d}
                onClick={() => setI(d)}
                aria-label={`Go to testimonial ${d + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  d === i ? 'w-6 bg-clay' : 'w-2 bg-coal/20'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next"
            className="grid h-11 w-11 place-items-center rounded-full border border-coal/15 text-coal transition-colors hover:border-clay hover:text-clay"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
