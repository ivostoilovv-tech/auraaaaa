import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { lenisScrollTo } from '../lib/useLenis'

export function Nav() {
  const { t, lang, toggle } = useLang()
  const [open, setOpen] = useState(false)

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    lenisScrollTo(id === 'home' ? 0 : `#${id}`)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[1000] px-3 pt-3 sm:px-6 sm:pt-4">
        <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-3 pr-2 sm:pl-5 sm:pr-3">
          <a href="#home" onClick={go('home')} className="flex items-center gap-2">
            <img
              src="logo.png"
              width={26}
              height={26}
              alt="Aura Design"
              className="h-6 w-6 animate-spin-slow"
            />
            <span className="font-display text-lg font-semibold tracking-tight">Aura</span>
          </a>

          <div className="hidden items-center gap-0.5 md:flex">
            {t.nav.links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                className="rounded-full px-3.5 py-2 text-sm text-text-soft transition-colors hover:text-text"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggle}
              aria-label={lang === 'bg' ? 'Switch to English' : 'Превключи на български'}
              className="rounded-full border border-coal/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-text-soft transition-colors hover:border-clay/50 hover:text-clay-deep"
            >
              {lang === 'bg' ? 'EN' : 'БГ'}
            </button>
            <a
              href="#contact"
              onClick={go('contact')}
              className="hidden rounded-full bg-coal px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-clay-deep sm:inline-block"
            >
              {t.nav.cta}
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-full text-text md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-2 bg-cream/95 backdrop-blur-xl md:hidden"
          >
            {t.nav.links.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.1 }}
                className="font-display text-4xl text-text"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={go('contact')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * t.nav.links.length + 0.1 }}
              className="mt-6 rounded-full bg-coal px-7 py-3 text-base font-medium text-cream"
            >
              {t.nav.cta}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
