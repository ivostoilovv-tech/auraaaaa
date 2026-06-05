import type { Lang } from '../i18n/dictionary'

type L = Record<Lang, string>
type LArr = Record<Lang, string[]>

export type Project = {
  id: string
  index: string
  name: string
  url: string
  live: boolean
  /** Live URL to embed as a scrollable mini-preview (only for real, frame-able sites). */
  embed?: string
  /** Project's own brand accent (cards carry their real identity color). */
  accent: string
  /** Fallback gradient shown until a real screenshot/mockup is wired in. */
  gradient: string
  image: string
  year: string
  category: L
  client: L
  description: L
  tags: LArr
}

export const projects: Project[] = [
  {
    id: 'tsenkova-law',
    index: '01',
    name: 'Tsenkova Law',
    url: 'https://www.yordanka-law.com/',
    live: true,
    embed: 'https://www.yordanka-law.com/',
    accent: '#1b365d',
    gradient: 'linear-gradient(135deg, #14233b 0%, #1b365d 45%, #355075 70%, #c9a84c 100%)',
    image: 'assets/work-tsenkova.jpg',
    year: '2026',
    category: {
      bg: 'Уеб дизайн и разработка',
      en: 'Web design & development',
    },
    client: {
      bg: 'Адв. Йорданка Ценкова',
      en: 'Yordanka Tsenkova, Attorney',
    },
    description: {
      bg: 'Личен сайт за адвокат от Берковица — 7 практики, онлайн консултации и записване, изграден на Next.js за безупречна скорост и достъпност.',
      en: 'A personal site for a Berkovitsa attorney — 7 practice areas, online consultations and booking, built on Next.js for flawless speed and accessibility.',
    },
    tags: {
      bg: ['Next.js', 'React', 'Право', 'UX'],
      en: ['Next.js', 'React', 'Law', 'UX'],
    },
  },
  {
    id: 'verdana-wellness',
    index: '02',
    name: 'Verdana Wellness',
    url: 'https://verdanawellness.com',
    live: false,
    accent: '#5e7568',
    gradient: 'linear-gradient(135deg, #f5ebe0 0%, #cdd9cf 45%, #8da399 75%, #4e635a 100%)',
    image: 'assets/work-verdana.jpg',
    year: '2025',
    category: { bg: 'Уеб дизайн', en: 'Web design' },
    client: { bg: 'Verdana Wellness', en: 'Verdana Wellness' },
    description: {
      bg: 'Платформа за холистично здраве и благополучие с персонализирани програми и онлайн консултации.',
      en: 'A holistic health & wellbeing platform with personalized programs and online consultations.',
    },
    tags: { bg: ['Платформа', 'Уелнес', 'CMS'], en: ['Platform', 'Wellness', 'CMS'] },
  },
  {
    id: 'solara-studio',
    index: '03',
    name: 'Solara Studio',
    url: 'https://solarastudio.bg',
    live: false,
    accent: '#a8533f',
    gradient: 'linear-gradient(135deg, #fbf2e8 0%, #e7c9ba 40%, #cc7a67 72%, #8e4838 100%)',
    image: 'assets/work-solara.jpg',
    year: '2025',
    category: { bg: 'Бранд идентичност', en: 'Brand identity' },
    client: { bg: 'Solara Studio', en: 'Solara Studio' },
    description: {
      bg: 'Креативно студио за интериорен дизайн с портфолио, което впечатлява от пръв поглед.',
      en: 'An interior-design studio with a portfolio that impresses at first glance.',
    },
    tags: { bg: ['Бранд', 'Дизайн', 'Портфолио'], en: ['Brand', 'Design', 'Portfolio'] },
  },
  {
    id: 'aterra-ceramics',
    index: '04',
    name: 'Aterra Ceramics',
    url: 'https://aterraceramics.com',
    live: false,
    accent: '#bc6c25',
    gradient: 'linear-gradient(135deg, #fefae0 0%, #e7c08a 38%, #bc6c25 68%, #606c38 100%)',
    image: 'assets/work-aterra.jpg',
    year: '2024',
    category: { bg: 'E-commerce', en: 'E-commerce' },
    client: { bg: 'Aterra Ceramics', en: 'Aterra Ceramics' },
    description: {
      bg: 'Ръчно изработена керамика с история — онлайн магазин с продажби на три континента.',
      en: 'Handcrafted ceramics with a story — an online shop selling across three continents.',
    },
    tags: { bg: ['E-commerce', 'Shopify', 'Бранд'], en: ['E-commerce', 'Shopify', 'Brand'] },
  },
  {
    id: 'luma-finance',
    index: '05',
    name: 'Luma Finance',
    url: 'https://lumafinance.io',
    live: false,
    accent: '#415a77',
    gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 40%, #415a77 72%, #cdd9e6 100%)',
    image: 'assets/work-luma.jpg',
    year: '2025',
    category: { bg: 'Уеб приложение', en: 'Web app' },
    client: { bg: 'Luma Finance', en: 'Luma Finance' },
    description: {
      bg: 'Финтех платформа за осъзнати инвестиции с интуитивен интерфейс и реални данни.',
      en: 'A fintech platform for mindful investing with an intuitive interface and live data.',
    },
    tags: { bg: ['App', 'Финтех', 'Данни'], en: ['App', 'Fintech', 'Data'] },
  },
]
