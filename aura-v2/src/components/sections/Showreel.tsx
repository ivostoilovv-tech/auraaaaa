import { useEffect, useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import { useLang } from '../../i18n/LanguageContext'
import { assets } from '../../data/assets'

function ScrubLetter({
  ch,
  progress,
  range,
}: {
  ch: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const y = useTransform(progress, range, ['115%', '0%'])
  const opacity = useTransform(progress, range, [0, 1])
  if (ch === ' ') return <span>&nbsp;</span>
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
      <motion.span style={{ display: 'inline-block', y, opacity }}>{ch}</motion.span>
    </span>
  )
}

/**
 * Showstopper: a pinned full-screen video whose playback is scrubbed by scroll
 * position, with a giant headline that assembles letter-by-letter as you scroll.
 */
export function Showreel() {
  const { t } = useLang()
  const wrapRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetP = useRef(0)

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    targetP.current = p
  })

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
    if (reduced || isMobile) {
      // Scrubbing 1080p via currentTime stutters on touch — autoplay-loop instead.
      v.loop = true
      v.play().catch(() => {})
      return
    }
    let raf = 0
    const loop = () => {
      if (v.duration) {
        const target = targetP.current * v.duration
        v.currentTime += (target - v.currentTime) * 0.18
      }
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(loop)
    }
    if (v.readyState >= 1) start()
    else v.addEventListener('loadedmetadata', start, { once: true })
    return () => {
      cancelAnimationFrame(raf)
      v.removeEventListener('loadedmetadata', start)
    }
  }, [])

  const line = t.showreel.line
  const letters = Array.from(line)
  const START = 0.12
  const END = 0.62
  const span = END - START

  const subOpacity = useTransform(scrollYProgress, [0.66, 0.82], [0, 1])
  const subY = useTransform(scrollYProgress, [0.66, 0.82], [24, 0])

  const src = assets.showreel.video || assets.hero.video

  return (
    <section ref={wrapRef} className="relative h-[340vh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/20 to-ink/65" />
        <div className="grain absolute inset-0 opacity-30" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {t.showreel.kicker}
          </p>
          <h2 className="font-display text-[clamp(2.6rem,11vw,11rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-cream">
            {letters.map((ch, i) => {
              const s = START + (i / letters.length) * span
              const e = Math.min(END, s + span / letters.length + 0.05)
              return <ScrubLetter key={i} ch={ch} progress={scrollYProgress} range={[s, e]} />
            })}
          </h2>
          <motion.p
            style={{ opacity: subOpacity, y: subY }}
            className="mt-8 max-w-md text-cream/75 sm:text-lg"
          >
            {t.showreel.sub}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
