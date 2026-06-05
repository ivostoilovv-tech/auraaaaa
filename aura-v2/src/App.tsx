import { useLenis } from './lib/useLenis'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { Nav } from './components/Nav'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { Work } from './components/sections/Work'
import { Showreel } from './components/sections/Showreel'
import { Marquee } from './components/sections/Marquee'
import { Process } from './components/sections/Process'
import { Metrics } from './components/sections/Metrics'
import { Testimonials } from './components/sections/Testimonials'
import { About } from './components/sections/About'
import { CTA } from './components/sections/CTA'
import { Footer } from './components/sections/Footer'

function App() {
  useLenis()

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
        <Metrics />
        <Testimonials />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
