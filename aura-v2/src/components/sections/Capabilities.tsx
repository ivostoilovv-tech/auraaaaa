import { Plus } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { FadeIn } from '../primitives/FadeIn'

export function Capabilities() {
  const { t } = useLang()

  return (
    <section id="services" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
            {t.capabilities.kicker}
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="mt-4 max-w-2xl whitespace-pre-line font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-semibold leading-[1.02] text-text">
            {t.capabilities.heading}
          </h2>
        </FadeIn>

        <div className="mt-12 border-t border-coal/12">
          {t.capabilities.items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.04}>
              <div className="group cursor-target border-b border-coal/12">
                <div className="flex items-center gap-5 py-7 sm:gap-8 sm:py-9">
                  <span className="font-display text-2xl tabular-nums text-clay/70 sm:text-3xl">
                    0{i + 1}
                  </span>
                  <h3 className="flex-1 font-display text-2xl font-semibold text-text transition-colors duration-300 group-hover:text-clay-deep sm:text-4xl">
                    {item.title}
                  </h3>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-coal/15 text-coal transition-all duration-300 group-hover:rotate-90 group-hover:border-clay group-hover:text-clay">
                    <Plus size={18} />
                  </span>
                </div>
                <div className="grid grid-rows-[1fr] pb-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:grid-rows-[0fr] md:pb-0 md:group-hover:grid-rows-[1fr] md:group-hover:pb-9">
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pl-[3.1rem] text-text-soft sm:pl-[4.3rem] sm:text-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
