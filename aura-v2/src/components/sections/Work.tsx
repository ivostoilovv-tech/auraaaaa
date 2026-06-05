import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import clsx from 'clsx'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { FadeIn } from '../primitives/FadeIn'
import { LiquidCanvas } from '../primitives/LiquidCanvas'
import { SitePreview } from '../primitives/SitePreview'
import { useIsDesktop } from '../../lib/useIsDesktop'
import { projects, type Project } from '../../data/projects'

function BrowserCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const { t, lang } = useLang()
  const isDesktop = useIsDesktop()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  const domain = project.live
    ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : lang === 'bg'
      ? 'в разработка'
      : 'in progress'

  return (
    <FadeIn>
      <article ref={ref} className="group cursor-target">
        <div className="relative overflow-hidden rounded-2xl border border-coal/10 bg-white shadow-[0_20px_60px_-32px_rgba(74,69,62,0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:shadow-[0_44px_100px_-44px_rgba(74,69,62,0.55)]">
          {/* Browser chrome */}
          <div className="flex items-center gap-3 border-b border-coal/8 bg-cream-2 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-clay/55" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-sage/70" />
            </div>
            <div className="mx-auto flex max-w-[70%] items-center gap-2 truncate rounded-md bg-cream px-3 py-1 text-xs text-text-mute">
              {project.embed ? (
                <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-sage-deep" />
              ) : null}
              <span className="truncate">{domain}</span>
            </div>
          </div>
          {/* Viewport */}
          <div
            className={clsx(
              'relative overflow-hidden',
              featured ? 'aspect-[16/9]' : 'aspect-[16/10]',
            )}
          >
            {project.embed ? (
              <SitePreview url={project.embed} title={project.name} />
            ) : (
              <>
                <motion.img
                  src={project.image}
                  alt={project.name}
                  style={{ y: imgY }}
                  className="absolute inset-[-7%] h-[114%] w-full object-cover"
                />
                {isDesktop ? (
                  <LiquidCanvas
                    src={project.image}
                    flow={1.1}
                    intensity={0.9}
                    className="absolute inset-0 h-full w-full"
                  />
                ) : null}
              </>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3
              className={clsx(
                'font-display font-bold text-text',
                featured ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-3xl',
              )}
            >
              {project.name}
            </h3>
            <p className="mt-1.5 text-sm text-text-mute">
              {project.category[lang]} · {project.year}
            </p>
          </div>
          {project.live ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.work.visit} — ${project.name}`}
              className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-coal/15 text-coal transition-colors hover:border-clay hover:bg-clay hover:text-cream"
            >
              <ArrowUpRight size={20} />
            </a>
          ) : (
            <span className="mt-1.5 shrink-0 rounded-full border border-coal/15 px-3 py-1.5 text-xs text-text-mute">
              {lang === 'bg' ? 'скоро' : 'soon'}
            </span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags[lang].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream-3 px-3 py-1 text-[11px] font-medium text-text-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </FadeIn>
  )
}

export function Work() {
  const { t } = useLang()
  const [featured, ...rest] = projects

  return (
    <section id="work" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
            {t.work.kicker}
          </p>
        </FadeIn>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <FadeIn delay={0.05}>
            <h2 className="max-w-2xl whitespace-pre-line font-display text-[clamp(2.6rem,6.5vw,5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-text">
              {t.work.heading}
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="max-w-sm text-text-soft sm:text-right">{t.work.sub}</p>
          </FadeIn>
        </div>

        <div className="mt-14">
          <BrowserCard project={featured} featured />
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-16 sm:mt-16 sm:grid-cols-2">
          {rest.map((project) => (
            <BrowserCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
