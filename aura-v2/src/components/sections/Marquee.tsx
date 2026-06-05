import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from 'framer-motion'
import { useLang } from '../../i18n/LanguageContext'

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

function Row({ items, baseVelocity }: { items: string[]; baseVelocity: number }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)

  useAnimationFrame((_, delta) => {
    let moveBy = baseVelocity * (delta / 1000)
    moveBy += moveBy * Math.abs(factor.get())
    baseX.set(baseX.get() + moveBy)
  })

  const content = [...items, ...items, ...items, ...items]
  return (
    <div className="flex flex-nowrap overflow-hidden">
      <motion.div style={{ x }} className="flex flex-nowrap whitespace-nowrap">
        {content.map((it, i) => (
          <span
            key={i}
            className="mx-7 font-display text-[clamp(1.5rem,3.8vw,3rem)] italic text-text/85"
          >
            {it} <span className="not-italic text-clay">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Marquee() {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden border-y border-coal/10 bg-cream-2 py-8 sm:py-12">
      <Row items={t.marquee} baseVelocity={2.6} />
      <div className="h-3 sm:h-4" />
      <Row items={[...t.marquee].reverse()} baseVelocity={-2.1} />
    </section>
  )
}
