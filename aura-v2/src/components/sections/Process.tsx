import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import clsx from 'clsx'
import { ArrowRight, Code2, Compass, Rocket, Route } from 'lucide-react'
import { useLang } from '../../i18n/LanguageContext'
import { LiquidCanvas } from '../primitives/LiquidCanvas'
import { useIsDesktop } from '../../lib/useIsDesktop'

const ICONS = [Compass, Route, Code2, Rocket]
const EASE = [0.22, 1, 0.36, 1] as const
// diagonal staircase — the eye follows the route down-right
const OFFSETS = ['lg:ml-[0%]', 'lg:ml-[19%]', 'lg:ml-[38%]', 'lg:ml-[55%]']

export function Process() {
  const { t } = useLang()
  const p = t.process
  const isDesktop = useIsDesktop()

  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([])
  const [path, setPath] = useState('')
  const [size, setSize] = useState({ w: 1, h: 1 })
  const [reached, setReached] = useState(0)

  // A station counts as reached once its circle climbs above the lower fifth
  // of the viewport. IntersectionObserver fires on those crossings regardless
  // of how the page scrolled (wheel, Lenis, anchor jump), and the actual count
  // is re-derived from geometry each time — robust at any viewport size.
  useEffect(() => {
    const recompute = () => {
      const vh = window.innerHeight
      let n = 0
      anchorRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < vh * 0.78) n = i + 1
      })
      setReached((r) => (r === n ? r : n))
    }
    recompute()
    const io = new IntersectionObserver(recompute, {
      rootMargin: '100% 0px -22% 0px',
      threshold: 0,
    })
    anchorRefs.current.forEach((el) => el && io.observe(el))
    window.addEventListener('resize', recompute)
    return () => {
      io.disconnect()
      window.removeEventListener('resize', recompute)
    }
  }, [])

  // gentle parallax for the silk backdrop
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(sectionProgress, [0, 1], ['-5%', '5%'])

  // the copper route draws while the steps move through the viewport
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.85', 'end 0.72'],
  })
  const drawn = useSpring(scrollYProgress, { stiffness: 130, damping: 25, mass: 0.35 })

  // Measure the icon circles and thread one smooth copper path through them,
  // like stations on a route. Re-measured on resize / text reflow.
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const compute = () => {
      const tr = track.getBoundingClientRect()
      const pts = anchorRefs.current
        .filter((el): el is HTMLDivElement => Boolean(el))
        .map((el) => {
          const r = el.getBoundingClientRect()
          return { x: r.left - tr.left + r.width / 2, y: r.top - tr.top + r.height / 2 }
        })
      if (pts.length < 2) return

      const start = { x: Math.max(14, pts[0].x - 64), y: -34 }
      const all = [start, ...pts]
      let d = `M ${all[0].x.toFixed(1)} ${all[0].y.toFixed(1)}`
      for (let i = 1; i < all.length; i++) {
        const a = all[i - 1]
        const b = all[i]
        const dy = Math.max(36, (b.y - a.y) * 0.6)
        d += ` C ${a.x.toFixed(1)} ${(a.y + dy).toFixed(1)}, ${b.x.toFixed(1)} ${(b.y - dy).toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
      }
      // small launch flourish past the final station
      d += ' c 26 20, 68 24, 102 4'
      setPath(d)
      setSize({ w: tr.width, h: tr.height })
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(track)
    return () => ro.disconnect()
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-24 sm:py-32"
    >
      {/* Flowing silk backdrop — rises softly from cream on every edge (no seams) */}
      <div className="pointer-events-none absolute -right-[8%] top-0 hidden h-full w-[52%] md:block lg:w-[46%]">
        <motion.div style={{ y: bgY }} className="absolute inset-x-0 -inset-y-[6%]">
          <img
            src="assets/process-silk.jpg"
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          {isDesktop ? (
            <LiquidCanvas
              videoSrc="assets/process-silk-loop.mp4"
              videoLoopSeconds={6.5}
              videoRate={0.45}
              flow={0.45}
              intensity={0.75}
              className="absolute inset-0 h-full w-full"
            />
          ) : null}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/40 to-cream/5" />
        <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-cream to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-cream to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.55em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.22em' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-xs font-semibold uppercase text-clay"
        >
          {p.kicker}
        </motion.p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.03em] text-ink">
          <motion.span
            initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="block"
          >
            {p.headingTop}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
            className="text-gradient block italic"
          >
            {p.headingAccent}
          </motion.span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          className="mt-6 max-w-md text-text-soft sm:text-lg"
        >
          {p.sub}
        </motion.p>

        {/* The journey — cards as stations on a drawn copper route */}
        <div ref={trackRef} className="relative mt-16 flex flex-col gap-7 sm:mt-20 lg:gap-9">
          {path ? (
            <svg
              className="pointer-events-none absolute inset-0 z-0 overflow-visible"
              width="100%"
              height="100%"
              viewBox={`0 0 ${size.w} ${size.h}`}
              aria-hidden="true"
            >
              <motion.path
                d={path}
                fill="none"
                stroke="#cc7a67"
                strokeOpacity="0.75"
                strokeWidth="1.75"
                strokeLinecap="round"
                style={{ pathLength: drawn }}
                className="[filter:drop-shadow(0_2px_8px_rgba(204,122,103,0.4))]"
              />
            </svg>
          ) : null}

          {p.steps.map((s, i) => {
            const Icon = ICONS[i]
            const state = reached > i ? (reached === i + 1 ? 'current' : 'passed') : 'todo'
            const isLast = i === p.steps.length - 1
            return (
              <motion.article
                key={s.title}
                initial={false}
                animate={{
                  opacity: state === 'todo' ? 0.3 : state === 'current' ? 1 : 0.85,
                  filter: state === 'todo' ? 'blur(2.5px)' : 'blur(0px)',
                }}
                whileHover={{ opacity: 1, y: -6 }}
                transition={{ duration: 0.6, ease: EASE }}
                className={clsx('group relative z-10 w-full max-w-[430px]', OFFSETS[i])}
              >
                {/* warm glow behind the active station */}
                <motion.div
                  initial={false}
                  animate={{ opacity: state === 'current' ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="pointer-events-none absolute -inset-3 rounded-[26px] bg-[radial-gradient(60%_70%_at_50%_45%,rgba(204,122,103,0.22),transparent_75%)] blur-md"
                />
                <div
                  className={clsx(
                    'relative rounded-2xl border bg-white/45 p-6 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 group-hover:bg-white/65 group-hover:backdrop-blur-lg sm:p-7',
                    state === 'current'
                      ? 'border-clay/30 shadow-[0_26px_60px_-30px_rgba(168,83,63,0.4)]'
                      : 'border-white/70 shadow-[0_18px_44px_-28px_rgba(74,69,62,0.3)]',
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      ref={(el) => {
                        anchorRefs.current[i] = el
                      }}
                      className={clsx(
                        'grid h-11 w-11 shrink-0 place-items-center rounded-full border bg-cream transition-colors duration-500',
                        state === 'todo' ? 'border-coal/15 text-coal/55' : 'border-clay/45 text-clay',
                      )}
                    >
                      <motion.span
                        animate={
                          isLast && state === 'current'
                            ? { scale: [1, 1.16, 1] }
                            : { scale: 1 }
                        }
                        transition={
                          isLast && state === 'current'
                            ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                            : { duration: 0.3 }
                        }
                        className="grid place-items-center transition-transform duration-500 group-hover:rotate-12"
                      >
                        <Icon size={19} strokeWidth={1.7} />
                      </motion.span>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-xl font-semibold leading-tight text-ink sm:text-[1.35rem]">
                        {s.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3.5 text-sm leading-relaxed text-text-soft">{s.desc}</p>
                  <p className="mt-3 text-xs tracking-wide text-coal/55">
                    {s.keywords.join(' · ')}
                  </p>
                  {!isLast ? (
                    <div className="mt-4 flex items-center gap-2 text-clay opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                      <span className="h-px w-0 bg-clay/70 transition-all duration-500 group-hover:w-7" />
                      <ArrowRight size={12} />
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em]">
                        {p.steps[i + 1].title}
                      </span>
                    </div>
                  ) : null}
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Principles — what guides the route (replaces the old stats) */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative z-10 mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-y-9 rounded-[20px] border border-white/70 bg-white/45 px-6 py-9 backdrop-blur-md sm:mt-24 sm:grid-cols-4 sm:py-10"
        >
          {p.principles.map((word, i) => (
            <div
              key={word}
              className={clsx('text-center', i > 0 && 'sm:border-l sm:border-coal/10')}
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.09, ease: EASE }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-clay">
                  0{i + 1}
                </span>
                <p className="mt-2 font-display text-2xl font-semibold text-ink lg:text-[1.7rem]">
                  {word}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
