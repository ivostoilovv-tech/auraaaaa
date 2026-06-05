import { ArrowUp } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { lenisScrollTo } from '../../lib/useLenis'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="relative bg-ink text-cream/80">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <img src="/logo.png" className="h-7 w-7" alt="" />
              <span className="font-display text-xl text-cream">Aura Design</span>
            </div>
            <p className="mt-4 text-sm text-cream/55">{t.footer.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {t.footer.columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-cream/60 transition-colors hover:text-cream"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <span className="text-xs text-cream/45">
            © 2026 Aura Design. {t.footer.rights}
          </span>
          <button
            onClick={() => lenisScrollTo(0)}
            className="inline-flex items-center gap-1.5 text-xs text-cream/60 transition-colors hover:text-cream"
          >
            {t.footer.backToTop}
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
