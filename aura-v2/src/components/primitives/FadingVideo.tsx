import { useEffect, useRef } from 'react'

type FadingVideoProps = {
  src: string
  poster?: string
  className?: string
  fadeMs?: number
  /** Seconds before the end to begin fading out. */
  fadeLead?: number
}

/**
 * Looping background video with a custom requestAnimationFrame crossfade —
 * fades in on start, fades out before the end, and re-loops seamlessly so
 * the loop seam is invisible. Respects prefers-reduced-motion (shows the
 * poster still instead of autoplaying).
 */
export function FadingVideo({
  src,
  poster,
  className,
  fadeMs = 600,
  fadeLead = 0.6,
}: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef(0)
  const fadingOut = useRef(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.style.opacity = '1'
      return
    }

    let cancelled = false

    const fadeTo = (target: number, duration: number) => {
      cancelAnimationFrame(rafRef.current)
      const start = performance.now()
      const from = parseFloat(v.style.opacity || '0')
      const step = (now: number) => {
        if (cancelled) return
        const p = Math.min((now - start) / duration, 1)
        v.style.opacity = String(from + (target - from) * p)
        if (p < 1) rafRef.current = requestAnimationFrame(step)
      }
      rafRef.current = requestAnimationFrame(step)
    }

    const onLoaded = () => {
      v.style.opacity = '0'
      v.play().catch(() => {})
      fadeTo(1, fadeMs)
    }
    const onTime = () => {
      if (
        !fadingOut.current &&
        v.duration &&
        v.duration - v.currentTime <= fadeLead &&
        v.duration - v.currentTime > 0
      ) {
        fadingOut.current = true
        fadeTo(0, fadeMs)
      }
    }
    const onEnded = () => {
      v.style.opacity = '0'
      window.setTimeout(() => {
        v.currentTime = 0
        v.play().catch(() => {})
        fadingOut.current = false
        fadeTo(1, fadeMs)
      }, 80)
    }

    v.addEventListener('loadeddata', onLoaded)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('ended', onEnded)
    if (v.readyState >= 2) onLoaded()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafRef.current)
      v.removeEventListener('loadeddata', onLoaded)
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('ended', onEnded)
    }
  }, [fadeMs, fadeLead, src])

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      style={{ opacity: 0 }}
    />
  )
}
