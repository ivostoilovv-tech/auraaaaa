import { useEffect, useRef } from 'react'
import { Renderer, Triangle, Program, Mesh, Texture } from 'ogl'

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uVel;
  uniform float uHover;
  uniform float uPlaneAspect;
  uniform float uImageAspect;
  uniform float uFlow;
  uniform float uIntensity;
  varying vec2 vUv;

  float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i = 0; i < 3; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; } return v; }

  vec2 cover(vec2 uv){
    vec2 s = uPlaneAspect > uImageAspect
      ? vec2(1.0, uImageAspect / uPlaneAspect)
      : vec2(uPlaneAspect / uImageAspect, 1.0);
    return (uv - 0.5) * s + 0.5;
  }

  void main(){
    vec2 uv = vUv;
    float t = uTime * 0.08;
    vec2 flow = vec2(fbm(uv * 3.0 + t), fbm(uv * 3.0 + 10.0 - t)) - 0.5;
    uv += flow * 0.035 * uFlow;

    float d = distance(vUv, uMouse);
    float infl = smoothstep(0.5, 0.0, d) * uHover;
    vec2 dir = normalize(vUv - uMouse + 1e-4);
    uv -= dir * infl * 0.13 * uIntensity;
    uv += uVel * infl * 7.5 * uIntensity;

    float ca = infl * 0.032 * uIntensity;
    vec3 col;
    col.r = texture2D(uTexture, cover(uv + dir * ca)).r;
    col.g = texture2D(uTexture, cover(uv)).g;
    col.b = texture2D(uTexture, cover(uv - dir * ca)).b;
    col += infl * 0.07;

    gl_FragColor = vec4(col, 1.0);
  }
`

type Props = {
  src?: string
  className?: string
  /** Use a muted, looping video as the distorted texture instead of an image. */
  videoSrc?: string
  /** Loop only the first N seconds of the video (skips a jarring loop point). */
  videoLoopSeconds?: number
  /** Playback speed for the video texture. */
  videoRate?: number
  /** Ambient flow strength (0 = still). */
  flow?: number
  /** Cursor-ripple strength multiplier (1 = full). */
  intensity?: number
}

/**
 * Interactive WebGL texture: ambient liquid flow + cursor ripple with
 * chromatic aberration. Transparent until the image loads, so a plain
 * <img> behind it acts as a seamless fallback.
 */
export function LiquidCanvas({
  src,
  className,
  videoSrc,
  videoLoopSeconds = 1.2,
  videoRate = 0.4,
  flow = 1,
  intensity = 1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let renderer: Renderer
    try {
      renderer = new Renderer({
        alpha: true,
        dpr: Math.min(2, window.devicePixelRatio || 1),
      })
    } catch {
      return
    }
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    const canvas = gl.canvas as HTMLCanvasElement
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    el.appendChild(canvas)

    const geometry = new Triangle(gl)
    const texture = new Texture(gl, {
      generateMipmaps: false,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE,
    })

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: [0.5, 0.5] },
        uVel: { value: [0, 0] },
        uHover: { value: 0 },
        uPlaneAspect: { value: 1 },
        uImageAspect: { value: 1 },
        uFlow: { value: flow },
        uIntensity: { value: intensity },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })

    let video: HTMLVideoElement | null = null
    if (videoSrc) {
      const v = document.createElement('video')
      video = v
      v.src = videoSrc
      v.muted = true
      v.loop = true
      v.playsInline = true
      v.autoplay = true
      v.crossOrigin = 'anonymous'
      v.addEventListener('loadeddata', () => {
        v.playbackRate = videoRate
        texture.image = v
        program.uniforms.uImageAspect.value = (v.videoWidth || 16) / (v.videoHeight || 9)
        v.play().catch(() => {})
      })
      v.addEventListener('timeupdate', () => {
        if (v.currentTime >= videoLoopSeconds) v.currentTime = 0.03
      })
    } else if (src) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = src
      img.onload = () => {
        texture.image = img
        program.uniforms.uImageAspect.value = img.naturalWidth / img.naturalHeight
      }
    }

    const resize = () => {
      const w = el.clientWidth || 1
      const h = el.clientHeight || 1
      renderer.setSize(w, h)
      program.uniforms.uPlaneAspect.value = w / h
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = [0.5, 0.5]
    const target = [0.5, 0.5]
    let hover = 0

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target[0] = (e.clientX - r.left) / r.width
      target[1] = 1 - (e.clientY - r.top) / r.height
      hover = 1
    }
    const onLeave = () => {
      hover = 0
    }
    window.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    let raf = 0
    let destroyed = false
    let visible = true
    const update = (t: number) => {
      if (destroyed || !visible) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(update)
      if (!texture.image) return
      if (video && video.readyState >= 2) texture.needsUpdate = true
      const nx = mouse[0] + (target[0] - mouse[0]) * 0.1
      const ny = mouse[1] + (target[1] - mouse[1]) * 0.1
      program.uniforms.uVel.value = [nx - mouse[0], ny - mouse[1]]
      mouse[0] = nx
      mouse[1] = ny
      program.uniforms.uMouse.value = mouse
      program.uniforms.uHover.value += (hover - program.uniforms.uHover.value) * 0.06
      program.uniforms.uTime.value = reduced ? 0 : t * 0.001
      renderer.render({ scene: mesh })
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !raf) raf = requestAnimationFrame(update)
      },
      { threshold: 0 },
    )
    io.observe(el)
    raf = requestAnimationFrame(update)

    return () => {
      destroyed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (video) {
        video.pause()
        video.removeAttribute('src')
        video.load()
      }
      const lose = gl.getExtension('WEBGL_lose_context')
      lose?.loseContext()
      if (canvas.parentNode === el) el.removeChild(canvas)
    }
  }, [src, videoSrc, videoLoopSeconds, videoRate, flow, intensity])

  return <div ref={ref} className={className} />
}
