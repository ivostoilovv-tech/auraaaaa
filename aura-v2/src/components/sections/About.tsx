import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../../i18n/LanguageContext'
import { lenisScrollTo } from '../../lib/useLenis'
import { FadeIn } from '../primitives/FadeIn'
import { Magnetic } from '../primitives/Magnetic'

const EASE = [0.22, 1, 0.36, 1] as const

/** One pinned piece on the studio material board. */
function Piece({
  className,
  delay,
  children,
}: {
  className?: string
  delay: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8%' }}
      whileHover={{ y: -5, scale: 1.025 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function About() {
  const { t } = useLang()
  return (
    <section id="about" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Studio material board — the system behind the work, not just a logo */}
        <FadeIn x={-30} y={0}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[28px] border border-coal/10 bg-cream-2 shadow-[0_30px_80px_-48px_rgba(74,69,62,0.5)]">
            <div className="grain absolute inset-0 opacity-30" />

            {/* slow orbital line */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full animate-[spin_55s_linear_infinite]"
              viewBox="0 0 100 125"
              aria-hidden="true"
            >
              <ellipse
                cx="50"
                cy="62.5"
                rx="42"
                ry="50"
                fill="none"
                stroke="#cc7a67"
                strokeOpacity="0.3"
                strokeWidth="0.35"
                strokeDasharray="2.5 3.5"
              />
            </svg>

            {/* label chip */}
            <Piece
              delay={0}
              className="absolute left-1/2 top-4 z-20 -translate-x-1/2"
            >
              <span className="glass inline-block rounded-full px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-coal/70">
                Aura System
              </span>
            </Piece>

            {/* marble swatch */}
            <Piece delay={0.08} className="absolute left-[6%] top-[9%] z-10 w-[40%]">
              <div className="-rotate-[4deg] overflow-hidden rounded-xl bg-white p-1.5 pb-5 shadow-[0_16px_36px_-18px_rgba(74,69,62,0.45)]">
                <img
                  src="assets/hero-a.jpg"
                  alt=""
                  className="aspect-[4/4.4] w-full rounded-lg object-cover"
                />
                <p className="mt-1.5 px-1 text-[8px] uppercase tracking-[0.22em] text-coal/55">
                  Marble · 01
                </p>
              </div>
            </Piece>

            {/* dark contrast swatch (deep ink marble) */}
            <Piece delay={0.16} className="absolute right-[7%] top-[7%] z-10 w-[34%]">
              <div className="rotate-[5deg] overflow-hidden rounded-xl bg-ink p-1.5 pb-5 shadow-[0_18px_40px_-18px_rgba(34,29,24,0.6)]">
                <img
                  src="assets/service-web.jpg"
                  alt=""
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <p className="mt-1.5 px-1 text-[8px] uppercase tracking-[0.22em] text-cream/60">
                  Ink · 02
                </p>
              </div>
            </Piece>

            {/* Aura mark */}
            <Piece
              delay={0.24}
              className="absolute left-1/2 top-[38%] z-20 -translate-x-1/2"
            >
              <Magnetic strength={0.35}>
                <div className="flex flex-col items-center">
                  <div className="glass grid h-20 w-20 animate-floaty place-items-center rounded-full shadow-[0_18px_44px_-20px_rgba(204,122,103,0.55)]">
                    <img src="logo.png" alt="Aura Design" className="h-10 w-10" />
                  </div>
                  <span className="mt-3 text-[9px] font-semibold uppercase tracking-[0.34em] text-coal/65">
                    Aura Design
                  </span>
                </div>
              </Magnetic>
            </Piece>

            {/* typography sample */}
            <Piece delay={0.32} className="absolute left-[5%] top-[56%] z-10 w-[42%]">
              <div className="rotate-[2deg] rounded-xl bg-white p-4 shadow-[0_16px_36px_-18px_rgba(74,69,62,0.4)]">
                <p className="font-display text-4xl font-semibold leading-none text-ink">
                  Aa
                </p>
                <p className="mt-2.5 text-[9px] text-coal/70">
                  <span className="font-display italic">Literata</span> — display
                </p>
                <p className="mt-1 text-[9px] text-coal/70">Plus Jakarta — body</p>
              </div>
            </Piece>

            {/* palette card */}
            <Piece delay={0.4} className="absolute right-[5%] top-[52%] z-10 w-[40%]">
              <div className="-rotate-[2.5deg] rounded-xl bg-white p-3.5 shadow-[0_16px_36px_-18px_rgba(74,69,62,0.4)]">
                <div className="flex gap-1.5">
                  {['#cc7a67', '#8da399', '#e9c46a', '#d9c1bc', '#221d18'].map((c) => (
                    <span
                      key={c}
                      className="h-7 flex-1 rounded-md border border-coal/8"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-coal/55">
                  Clay · Sage · Gold
                </p>
              </div>
            </Piece>

            {/* tiny UI detail */}
            <Piece
              delay={0.48}
              className="absolute bottom-[4%] left-1/2 z-10 w-[52%] -translate-x-1/2"
            >
              <div className="-rotate-[1.5deg] rounded-xl bg-white p-3.5 shadow-[0_16px_36px_-18px_rgba(74,69,62,0.4)]">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-clay/60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-sage/70" />
                </div>
                <div className="mt-2.5 h-1.5 w-3/4 rounded-full bg-coal/10" />
                <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-coal/10" />
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-clay px-3 py-1 text-[8px] font-medium text-cream">
                  Aura UI
                  <ArrowUpRight size={9} />
                </span>
              </div>
            </Piece>
          </div>
        </FadeIn>

        <div>
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
              {t.about.kicker}
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-text">
              {t.about.heading}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-text-soft">{t.about.body}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                lenisScrollTo('#contact')
              }}
              className="group mt-8 inline-flex items-center gap-2 font-medium text-clay-deep"
            >
              {t.about.link}
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
