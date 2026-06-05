/**
 * Central registry of generated Higgsfield assets.
 * Video fields stay empty until the loop is generated + downloaded, then
 * components upgrade automatically from the still poster to the video loop.
 */
export const assets = {
  hero: {
    poster: 'assets/hero-a.jpg',
    video: 'assets/hero-loop-dramatic.mp4',
  },
  manifesto: {
    poster: 'assets/manifesto.jpg',
    video: 'assets/manifesto-loop.mp4',
  },
  cta: {
    poster: 'assets/cta.jpg',
    video: 'assets/cta-loop.mp4',
  },
  showreel: {
    poster: 'assets/hero-a.jpg',
    video: 'assets/showreel-scrub.mp4',
  },
  about: {
    poster: '',
    video: '',
  },
} as const
