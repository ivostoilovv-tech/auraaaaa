import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useLang } from '../../i18n/LanguageContext'
import { FadeIn } from '../primitives/FadeIn'

function Step({
  i,
  title,
  desc,
  last,
}: {
  i: number
  title: string
  desc: string
  last: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.35'],
  })
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-10">
      <div className="relative flex flex-col items-center">
        <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-coal/12"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-clay"
              style={{ pathLength }}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-lg font-semibold text-text sm:text-xl">
            0{i + 1}
          </span>
        </div>
        {!last && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-clay/40 to-transparent" />
        )}
      </div>
      <div className="pb-12 sm:pb-16">
        <FadeIn>
          <h3 className="font-display text-2xl font-semibold text-text sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 max-w-lg text-text-soft sm:text-lg">{desc}</p>
        </FadeIn>
      </div>
    </div>
  )
}

export function Process() {
  const { t } = useLang()
  return (
    <section id="process" className="relative bg-cream-2 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
            {t.process.kicker}
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="mb-14 mt-4 max-w-2xl whitespace-pre-line font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-semibold leading-[1.02] text-text">
            {t.process.heading}
          </h2>
        </FadeIn>
        <div>
          {t.process.steps.map((s, i) => (
            <Step
              key={s.title}
              i={i}
              title={s.title}
              desc={s.desc}
              last={i === t.process.steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
