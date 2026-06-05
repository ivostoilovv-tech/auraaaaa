import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Asterisk, Sparkle, CircleDot, Code2, ArrowRight } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { LiquidCanvas } from '../primitives/LiquidCanvas'
import { useIsDesktop } from '../../lib/useIsDesktop'

const MARBLES = [
  'assets/service-brand.jpg',
  'assets/service-web.jpg',
  'assets/service-motion.jpg',
  'assets/service-dev.jpg',
]
const FALLBACKS = [
  'linear-gradient(155deg, #fff8f3, #f0d590 70%, #c99a2e)',
  'linear-gradient(155deg, #14233b, #1b365d 55%, #c9a84c)',
  'linear-gradient(155deg, #f3d9c8, #cc7a67 70%, #a8533f)',
  'linear-gradient(155deg, #2a251f, #4a453e 55%, #c99a2e)',
]
const ICONS = [Asterisk, Sparkle, CircleDot, Code2]
const EASE = [0.22, 1, 0.36, 1] as const

// Custom luxury-ticket silhouette — inward (concave) corner cut-outs, varied per
// card so they never read as copy-pasted boxes. Built with a radial-gradient mask.
const R = 28
type Notch = { tl?: boolean; tr?: boolean; bl?: boolean; br?: boolean; side?: boolean }
const NOTCHES: Notch[] = [
  { tl: true, br: true, bl: true }, // 01 — top-left, bottom-right, bottom-left
  { bl: true, tr: true }, // 02 — bottom-left + top-right
  { tl: true, tr: true }, // 03 — both top corners
  { tl: true, tr: true }, // 04 — both top corners
]
function maskStyle(i: number): React.CSSProperties {
  const c = NOTCHES[i]
  let m: string
  if (c.side) {
    m = `radial-gradient(${R + 4}px at 100% 50%, #0000 98%, #000)`
  } else {
    const solid = 'linear-gradient(#000 0 0)'
    const notch = (at: string) => `radial-gradient(${R}px at ${at}, #0000 98%, #000)`
    m = [
      `${c.tl ? notch('left top') : solid} left top / 51% 51% no-repeat`,
      `${c.tr ? notch('right top') : solid} right top / 51% 51% no-repeat`,
      `${c.bl ? notch('left bottom') : solid} left bottom / 51% 51% no-repeat`,
      `${c.br ? notch('right bottom') : solid} right bottom / 51% 51% no-repeat`,
    ].join(', ')
  }
  return { WebkitMask: m, mask: m }
}

type ServiceItem = {
  title: string
  desc: string
  revealHeading: string
  includes: string[]
  cta: string
}

function ServiceCard({ item, i }: { item: ServiceItem; i: number }) {
  const isDesktop = useIsDesktop()
  const ref = useRef<HTMLElement>(null)
  const Icon = ICONS[i]

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.72, delay: i * 0.1, ease: EASE }}
      // drop-shadow lives on this (un-masked) parent so it traces the notched child
      className="group relative h-[clamp(300px,33vh,384px)] transition-[transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [filter:drop-shadow(0_18px_30px_rgba(74,69,62,0.16))] hover:-translate-y-2 hover:[filter:drop-shadow(0_32px_50px_rgba(168,83,63,0.3))]"
    >
      {/* Border layer (masked, 1.5px larger) makes the carved edge visible on cream-on-cream */}
      <div
        style={maskStyle(i)}
        className="absolute -inset-[1.5px] bg-sand-deep/80 transition-colors duration-500 group-hover:bg-clay"
      />
      <div
        style={maskStyle(i)}
        className="absolute inset-0 overflow-hidden rounded-[16px] bg-cream"
      >
        {/* Marble — a strip by default, floods the whole card on hover */}
        <div
          className="absolute inset-y-0 left-0 z-0 w-[36%] overflow-hidden transition-[width] duration-[800ms] ease-[cubic-bezier(0.72,0,0.18,1)] group-hover:w-full"
          style={{ background: FALLBACKS[i] }}
        >
          <img
            src={MARBLES[i]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          {isDesktop ? (
            <LiquidCanvas
              src={MARBLES[i]}
              flow={1.1}
              intensity={0.85}
              className="absolute inset-0 h-full w-full"
            />
          ) : null}
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/60" />
        </div>

        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(190px circle at var(--mx) var(--my), rgba(233,196,106,0.22), transparent 60%)',
          }}
        />

        {/* Inner hairline frame following the body */}
        <div className="pointer-events-none absolute inset-[7px] z-10 rounded-[10px] border border-coal/12 transition-colors duration-500 group-hover:border-cream/25" />

        {/* Default content — number pinned top, arrow pinned bottom (identical on every card) */}
        <div className="absolute inset-0 z-20 ml-[36%] flex flex-col p-6 transition-opacity duration-300 group-hover:opacity-0 sm:p-7">
          <div className="flex items-start justify-between">
            <span className="font-display text-[3.1rem] font-semibold leading-none text-clay/80">
              0{i + 1}
            </span>
            <span className="mt-2 flex items-center gap-3 text-coal/45">
              <span className="h-px w-9 bg-coal/25" />
              <Icon size={18} strokeWidth={1.6} />
            </span>
          </div>
          <div className="mt-auto">
            <h3 className="line-clamp-2 min-h-[2.3em] font-display text-2xl font-semibold leading-tight text-text">
              {item.title}
            </h3>
            <p className="mt-2 line-clamp-2 min-h-[2.7em] max-w-[26ch] text-sm leading-relaxed text-text-soft">
              {item.desc}
            </p>
            <div className="mt-3 flex justify-end">
              <div className="grid h-9 w-9 place-items-center rounded-full border border-coal/20 text-coal transition-colors duration-300 group-hover:border-clay group-hover:text-clay">
                <ArrowRight size={15} />
              </div>
            </div>
          </div>
        </div>

        {/* Hover reveal — over the flooded marble */}
        <div className="absolute inset-0 z-30 flex flex-col justify-center p-6 text-cream opacity-0 transition-opacity duration-500 [transition-delay:120ms] group-hover:opacity-100 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-soft">
            {item.revealHeading}
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {item.includes.map((inc) => (
              <li key={inc} className="flex items-center gap-2 text-sm text-cream/90">
                <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                {inc}
              </li>
            ))}
          </ul>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cream">
            {item.cta}
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export function Services() {
  const { t } = useLang()
  const s = t.services
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const headingLines = s.heading.split('\n')

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-24 sm:py-32"
    >
      {/* Ambient liquid background — slow looping video with hero-style WebGL distortion */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 0.92, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE }}
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-[14%] top-0 h-full w-[62%]"
      >
        <LiquidCanvas
          src="assets/hero-a.jpg"
          flow={0}
          intensity={0.85}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/5 via-cream/35 to-cream" />
      </motion.div>

      {/* Soft cream fade-in at the very top so the ambient marble rises in
          gently instead of starting on a hard edge — this, paired with the
          hero's bottom fade, dissolves the hero→services seam. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-cream via-cream/75 to-transparent" />

      <div className="relative mx-auto grid max-w-[88rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        {/* Left column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.55em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.22em' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-xs font-semibold uppercase text-clay"
          >
            {s.label}
          </motion.p>

          <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.03em] text-text">
            {headingLines.map((line, li) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, x: -28, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: li * 0.15, ease: EASE }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h2>

          <div className="my-8 flex items-center gap-3">
            <span className="h-px w-12 bg-coal/25" />
            <img src="/logo.png" alt="" className="h-4 w-4 opacity-80" />
            <span className="h-px flex-1 bg-coal/15" />
          </div>

          <p className="max-w-md text-lg leading-relaxed text-text-soft">{s.lead}</p>

          <div className="mt-10 flex items-start gap-3">
            <img src="/logo.png" alt="" className="mt-0.5 h-4 w-4 opacity-70" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
                {s.builtKicker}
              </p>
              <p className="mt-1.5 text-sm text-text-soft">{s.builtText}</p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="relative">
          {/* decorative arc sweeping over the grid */}
          <svg
            className="pointer-events-none absolute -top-12 left-0 hidden h-24 w-full text-clay/30 lg:block"
            viewBox="0 0 600 80"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 76 C 160 8, 440 8, 600 56" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="grid gap-5 sm:grid-cols-2">
            {s.items.map((item, i) => (
              <ServiceCard key={item.title} item={item} i={i} />
            ))}
          </div>

        </div>
      </div>

      {/* Outro */}
      <div className="relative mx-auto mt-16 max-w-3xl px-6 text-center sm:mt-20">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-coal/20" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-clay">
            {s.outroKicker}
          </p>
          <span className="h-px w-10 bg-coal/20" />
        </div>
        <p className="font-display text-xl italic text-text-soft sm:text-2xl">{s.outro}</p>
      </div>
    </section>
  )
}
