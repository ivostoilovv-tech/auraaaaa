import { useLang } from '../../i18n/LanguageContext'
import { assets } from '../../data/assets'
import { FadeIn } from '../primitives/FadeIn'
import { Magnetic } from '../primitives/Magnetic'
import { FadingVideo } from '../primitives/FadingVideo'

export function CTA() {
  const { t } = useLang()
  return (
    <section
      id="contact"
      className="relative flex min-h-[90svh] items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={assets.cta.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {assets.cta.video ? (
          <FadingVideo
            src={assets.cta.video}
            poster={assets.cta.poster}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/45 via-transparent to-cream/55" />
        <div className="grain absolute inset-0 opacity-40" />
      </div>

      <div className="relative z-10 px-6 text-center">
        <FadeIn>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-clay-deep">
            {t.cta.kicker}
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="mx-auto max-w-3xl whitespace-pre-line font-display text-[clamp(2.4rem,6.5vw,5.2rem)] font-semibold leading-[1.0] text-text">
            {t.cta.heading}
          </h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <Magnetic strength={0.4} className="mt-10 inline-block">
            <a
              href={`mailto:${t.cta.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-coal px-8 py-4 text-base font-medium text-cream transition-colors hover:bg-clay-deep"
            >
              {t.cta.button}
            </a>
          </Magnetic>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div>
            <a
              href={`mailto:${t.cta.email}`}
              className="mt-6 inline-block text-text-soft underline-offset-4 transition-colors hover:text-clay-deep hover:underline"
            >
              {t.cta.email}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
