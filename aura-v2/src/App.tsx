import { useEffect } from 'react'
import { useLenis, lenisScrollTo } from './lib/useLenis'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { Nav } from './components/Nav'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { Work } from './components/sections/Work'
import { Showreel } from './components/sections/Showreel'
import { Marquee } from './components/sections/Marquee'
import { Process } from './components/sections/Process'
import { Testimonials } from './components/sections/Testimonials'
import { About } from './components/sections/About'
import { CTA } from './components/sections/CTA'
import { Footer } from './components/sections/Footer'

function App() {
  useLenis()

  // Deep-link support: /?jump=process scrolls to a section after load
  // (plain #hash is reset by Lenis's initial scroll-to-top).
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('jump')
    if (!id) return
    const t = setTimeout(() => lenisScrollTo(`#${id}`), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <Showreel />
        <Marquee />
        <Process />
        <Testimonials />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
