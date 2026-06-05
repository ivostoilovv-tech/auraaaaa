import { useEffect, useRef, useState } from 'react'

const BASE_W = 1440

/**
 * Live, scrollable mini-preview of a real website (iframe at desktop width,
 * scaled to fit). A gentle SVG turbulence/displacement filter gives a subtle
 * "liquid" feel — purely visual, so it never blocks scrolling or sticks the
 * cursor. `data-lenis-prevent` keeps the page smooth-scroll from hijacking.
 */
export function SitePreview({ url, title }: { url: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.7)
  const [height, setHeight] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [clear, setClear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      setScale(el.clientWidth / BASE_W)
      setHeight(el.clientHeight)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Clear the distortion as the cursor approaches, so the live site is crisp
  // and usable when you actually look at it (the effect only lingers at rest).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const m = 60
      setClear(
        e.clientX >= r.left - m &&
          e.clientX <= r.right + m &&
          e.clientY >= r.top - m &&
          e.clientY <= r.bottom + m,
      )
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div
      ref={ref}
      data-lenis-prevent
      className="absolute inset-0 overflow-hidden bg-white"
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <filter id="site-liquid" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.009"
            numOctaves="2"
            seed="4"
            result="n"
          >
            {!reduced ? (
              <animate
                attributeName="baseFrequency"
                dur="20s"
                values="0.006 0.009;0.009 0.006;0.006 0.009"
                repeatCount="indefinite"
              />
            ) : null}
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {height > 0 && scale > 0 ? (
        <iframe
          src={url}
          title={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="origin-top-left border-0"
          style={{
            width: BASE_W,
            height: height / scale,
            transform: `scale(${scale})`,
            filter: reduced || clear ? undefined : 'url(#site-liquid)',
            transition: 'filter 0.4s ease',
          }}
        />
      ) : null}

      {!loaded ? (
        <div className="absolute inset-0 grid place-items-center bg-cream-2 text-sm text-text-mute">
          Зареждане на живия сайт…
        </div>
      ) : null}
    </div>
  )
}
