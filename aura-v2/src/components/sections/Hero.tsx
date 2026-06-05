import { motion } from 'framer-motion'
import clsx from 'clsx'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { lenisScrollTo } from '../../lib/useLenis'
import { Magnetic } from '../primitives/Magnetic'
import { LiquidCanvas } from '../primitives/LiquidCanvas'
import { assets } from '../../data/assets'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Hero() {
  const { t } = useLang()
  const headline = t.hero.headline

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      {/* Interactive WebGL distortion (cursor-reactive), with still fallback */}
      <div className="absolute inset-0 z-0">
        <img
          src={assets.hero.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <LiquidCanvas
          src={assets.hero.poster}
          flow={1.3}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-cream/0 via-[55%] to-cream" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 46% at 50% 45%, rgba(255,248,243,0.4), transparent 72%)',
          }}
        />
        <div className="grain absolute inset-0" />
        {/* Final fade so grain + marble dissolve to flat cream at the very
            bottom edge — makes the hero→services seam invisible. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-b from-transparent to-cream" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-text-soft"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-clay" />
          {t.hero.studio}
        </motion.p>

        <h1 className="max-w-[14ch] font-display text-[clamp(3rem,12.5vw,9.8rem)] font-bold leading-[0.88] tracking-[-0.045em] text-ink">
          {headline.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: '0.7em', filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.95, delay: 0.15 + i * 0.13, ease: EASE }}
              className={clsx(
                'inline-block',
                i === t.hero.headlineEmphasis && 'text-gradient italic',
              )}
            >
              {word}
              {i < headline.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.6, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-relaxed text-text-soft sm:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.8, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                lenisScrollTo('#contact')
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-clay-deep"
            >
              {t.hero.ctaPrimary}
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault()
              lenisScrollTo('#work')
            }}
            className="inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-text-soft transition-colors hover:text-text"
          >
            {t.hero.ctaSecondary}
            <span className="text-clay">→</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => lenisScrollTo('#work')}
        aria-label={t.hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative z-10 mx-auto mb-8 flex flex-col items-center gap-2 text-text-mute"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">{t.hero.scroll}</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  )
}
