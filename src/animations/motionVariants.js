const luxuryEase = [0.22, 1, 0.36, 1]

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: luxuryEase } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: luxuryEase } },
}

export const softScale = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: luxuryEase } },
}

export const cinematicReveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.5, ease: luxuryEase } },
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
}

export const simpleFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}
