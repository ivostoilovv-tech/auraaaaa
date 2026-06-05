import { useEffect, useRef } from 'react'

/** Custom dual-ring cursor with eased ring follow + grow on interactive hover. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    document.body.classList.add('has-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px)`
    }

    let raf = 0
    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove)

    const sel = 'a, button, [role="button"], input, textarea, .cursor-target'
    const over = (e: Event) => {
      if ((e.target as HTMLElement).closest?.(sel))
        innerRef.current?.classList.add('scale-[2.4]', 'bg-clay/10')
    }
    const out = (e: Event) => {
      if ((e.target as HTMLElement).closest?.(sel))
        innerRef.current?.classList.remove('scale-[2.4]', 'bg-clay/10')
    }
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block">
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay" />
      </div>
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block">
        <div
          ref={innerRef}
          className="h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-clay/40 transition-transform duration-200 ease-out"
        />
      </div>
    </>
  )
}
