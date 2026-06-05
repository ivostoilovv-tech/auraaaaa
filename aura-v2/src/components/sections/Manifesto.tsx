import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useLang } from '../../i18n/LanguageContext'
import { assets } from '../../data/assets'
import { FadingVideo } from '../primitives/FadingVideo'

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  )
}

export function Manifesto() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const lines = [t.manifesto.lead, ...t.manifesto.statements].map((l) => l.split(' '))
  const total = lines.reduce((sum, w) => sum + w.length, 0)
  let gi = 0

  return (
    <section ref={ref} className="relative h-[240vh] bg-ink text-cream">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={assets.manifesto.poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-75"
          />
          {assets.manifesto.video ? (
            <FadingVideo
              src={assets.manifesto.video}
              poster={assets.manifesto.poster}
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/75" />
          <div className="grain absolute inset-0 opacity-40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            {t.manifesto.kicker}
          </p>
          <div className="font-display text-[clamp(1.7rem,4.4vw,3.4rem)] font-medium leading-[1.2]">
            {lines.map((words, li) => (
              <p key={li} className={li === 0 ? 'mb-8' : 'mb-1'}>
                {words.map((w) => {
                  const start = gi / total
                  const end = Math.min(1, (gi + 1.5) / total)
                  gi += 1
                  return (
                    <Word key={`${li}-${w}-${gi}`} progress={scrollYProgress} range={[start, end]}>
                      {w}
                    </Word>
                  )
                })}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
