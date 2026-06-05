import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { lenisScrollTo } from '../../lib/useLenis'
import { FadeIn } from '../primitives/FadeIn'
import { Magnetic } from '../primitives/Magnetic'

export function About() {
  const { t } = useLang()
  return (
    <section id="about" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <FadeIn x={-30} y={0}>
          <div
            className="relative aspect-square overflow-hidden rounded-[32px] border border-coal/10"
            style={{
              background:
                'radial-gradient(120% 120% at 30% 20%, #f0d590, #cc7a67 45%, #8e4838 100%)',
            }}
          >
            <div className="grain absolute inset-0 opacity-40" />
            <div className="absolute inset-0 grid place-items-center">
              <Magnetic strength={0.5}>
                <img
                  src="/logo.png"
                  alt="Aura Design"
                  className="h-40 w-40 animate-floaty drop-shadow-2xl sm:h-56 sm:w-56"
                />
              </Magnetic>
            </div>
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
