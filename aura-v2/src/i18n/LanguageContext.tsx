import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { dict, type Copy, type Lang } from './dictionary'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  t: Copy
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = 'aura-lang'

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'bg'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'bg' || saved === 'en') return saved
  return 'bg'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggle = useCallback(
    () => setLangState((prev) => (prev === 'bg' ? 'en' : 'bg')),
    [],
  )

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    document.title = dict[lang].meta.title
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
