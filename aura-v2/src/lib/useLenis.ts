import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenisInstance: Lenis | null = null

/** Smooth-scroll to a section. Falls back to native scroll under reduced motion. */
export function lenisScrollTo(
  target: string | number | HTMLElement,
  offset = -72,
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.2 })
  } else if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Buttery smooth-scroll wired into GSAP's ticker so ScrollTrigger
 * stays perfectly in sync. Disabled when the user prefers reduced motion.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })
    lenisInstance = lenis
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}
