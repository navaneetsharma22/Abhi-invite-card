import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import GoldenParticles from '../../components/effects/GoldenParticles'
import PetalField from '../../components/effects/PetalField'
import IncenseSmoke from '../../components/effects/IncenseSmoke'
import SacredHalo from '../../components/effects/SacredHalo'
import TempleGlow from '../../components/effects/TempleGlow'
import DiyaAtmosphere from '../../components/effects/DiyaAtmosphere'
import ReflectionShimmer from '../../components/effects/ReflectionShimmer'
import RoyalDivider from '../../components/ui/RoyalDivider'
import { waitForOpeningReady } from './openingReadiness'
import './Opening.css'
import './OpeningEffects.css'

const openingAssets = {
  background: '/images/opening/opening-bg.webp.png',
  ganesha: '/images/opening/ganesha.webp.png',
  diya: '/images/opening/diya.webp.png',
}

export default function Opening({ onExitStart, onComplete }) {
  const rootRef = useRef(null)
  const backgroundRef = useRef(null)
  const ganeshaRef = useRef(null)
  const diyaRef = useRef(null)
  const completedRef = useRef(false)
  const exitStartedRef = useRef(false)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    let active = true
    let masterTimeline
    let loadingExitTimeline
    let fallbackTimer
    const abortController = new AbortController()
    const shouldReduceMotion = reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const stage = root.querySelector('[data-opening-stage]')
      const loadingLayer = root.querySelector('[data-opening-loading]')
      const background = root.querySelector('[data-opening-bg]')
      const mantra = root.querySelector('[data-opening-mantra]')
      const ganesha = root.querySelector('[data-opening-ganesha]')
      const shubh = root.querySelector('[data-opening-shubh]')
      const blessing = root.querySelector('[data-opening-blessing]')
      const diya = root.querySelector('[data-opening-diya]')
      const tagline = root.querySelector('[data-opening-tagline]')
      const veil = root.querySelector('[data-opening-veil]')
      const templeGlow = root.querySelector('[data-opening-temple-glow]')
      const smoke = root.querySelector('[data-opening-smoke]')
      const particles = root.querySelector('[data-opening-particles]')
      const petals = root.querySelector('[data-opening-petals]')
      const halo = root.querySelector('[data-opening-halo]')
      const diyaGlow = root.querySelector('[data-opening-diya-glow]')
      const floorGlow = root.querySelector('[data-opening-floor-glow]')
      const flameGlow = root.querySelector('[data-opening-flame-glow]')
      const reflection = root.querySelector('[data-opening-reflection]')
      const divider = root.querySelector('[data-opening-divider]')

      const beginExit = () => {
        if (!active || exitStartedRef.current) return
        exitStartedRef.current = true
        onExitStart?.()
      }

      const finish = () => {
        if (!active || completedRef.current) return
        beginExit()
        completedRef.current = true
        window.clearTimeout(fallbackTimer)
        onComplete?.()
      }

      gsap.set(root, { opacity: 1 })
      gsap.set(loadingLayer, { opacity: 1, display: 'block' })
      gsap.set(stage, { scale: 1, filter: 'blur(0px)' })
      gsap.set(background, { opacity: 0, scale: shouldReduceMotion ? 1 : 1.02, yPercent: 0, transformOrigin: 'center center' })
      gsap.set(veil, { opacity: 0 })
      gsap.set([templeGlow, smoke, particles, petals, halo, diyaGlow, floorGlow, flameGlow, reflection, divider], { opacity: 0 })
      gsap.set(divider, { scaleX: shouldReduceMotion ? 1 : 0, transformOrigin: 'center center' })

      loadingExitTimeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (!active || completedRef.current) return
          gsap.set(loadingLayer, { display: 'none' })
          masterTimeline.play(0)
          fallbackTimer = window.setTimeout(finish, 5600)
        },
      }).to(loadingLayer, { opacity: 0, duration: 0.25, ease: 'power1.out' })

      if (shouldReduceMotion) {
        gsap.set([mantra, ganesha, shubh, blessing, diya, tagline], { opacity: 0 })

        masterTimeline = gsap.timeline({ paused: true, onComplete: finish })
        masterTimeline
          .addLabel('background', 0)
          .addLabel('mantra', 0.25)
          .addLabel('ganesha', 0.55)
          .addLabel('shubh', 0.9)
          .addLabel('blessing', 1.1)
          .addLabel('diya', 1.3)
          .addLabel('tagline', 1.55)
          .addLabel('breathe', 2)
          .addLabel('heroExit', 3.4)
          .addLabel('exit', 3.7)
          .call(beginExit, null, 'heroExit')
          .to(background, { opacity: 1, duration: 0.45 }, 'background')
          .to(mantra, { opacity: 1, duration: 0.45 }, 'mantra')
          .to(ganesha, { opacity: 1, duration: 0.55 }, 'ganesha')
          .to(shubh, { opacity: 1, duration: 0.45 }, 'shubh')
          .to(blessing, { opacity: 1, duration: 0.45 }, 'blessing')
          .to(diya, { opacity: 0.97, duration: 0.55 }, 'diya')
          .to(tagline, { opacity: 1, duration: 0.45 }, 'tagline')
          .to(templeGlow, { opacity: 1, duration: 0.3 }, 'background+=0.2')
          .to(halo, { opacity: 1, duration: 0.4 }, 'ganesha')
          .to(diyaGlow, { opacity: 1, duration: 0.4 }, 'diya')
          .to(floorGlow, { opacity: 1, duration: 0.4 }, 'diya')
          .to(flameGlow, { opacity: 1, duration: 0.35 }, 'diya+=0.2')
          .to(divider, { opacity: 0.75, duration: 0.35 }, 'tagline')
          .to(root, { opacity: 0, duration: 0.55, ease: 'power1.inOut' }, 'exit')

        return
      }

      gsap.set(mantra, { opacity: 0, y: 14, filter: 'blur(5px)' })
      gsap.set(ganesha, { opacity: 0, scale: 0.9, y: 8, filter: 'blur(7px) brightness(.75)' })
      gsap.set(shubh, { opacity: 0, y: 12, filter: 'blur(4px)' })
      gsap.set(blessing, { opacity: 0, y: 10, filter: 'blur(4px)' })
      gsap.set(diya, { opacity: 0, y: 28, scale: 0.93 })
      gsap.set(tagline, { opacity: 0, y: 10 })

      masterTimeline = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
        onComplete: finish,
      })

      masterTimeline
        .addLabel('background', 0)
        .addLabel('mantra', 0.28)
        .addLabel('ganesha', 0.48)
        .addLabel('shubh', 1)
        .addLabel('blessing', 1.18)
        .addLabel('diya', 1.35)
        .addLabel('tagline', 1.75)
        .addLabel('breathe', 2.2)
        .addLabel('warmth', 3.4)
        .addLabel('exit', 3.7)
        .call(beginExit, null, 'warmth')
        .to(background, { opacity: 1, duration: 0.55 }, 'background')
        .to(background, { scale: 1.055, yPercent: -0.5, duration: 4.2, ease: 'none' }, 'background')
        .to(mantra, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55 }, 'mantra')
        .to(ganesha, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px) brightness(1)', duration: 0.75 }, 'ganesha')
        .to(ganesha, { scale: 1.012, y: -2, duration: 0.14, ease: 'sine.out' }, 'ganesha+=0.75')
        .to(ganesha, { scale: 1, y: 0, duration: 0.46, ease: 'sine.out' }, 'ganesha+=0.89')
        .to(shubh, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.48 }, 'shubh')
        .to(blessing, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.52, ease: 'power2.out' }, 'blessing')
        .to(diya, { opacity: 0.97, y: 0, scale: 1, duration: 0.65 }, 'diya')
        .to(diya, { scale: 1.015, duration: 0.12, ease: 'sine.out' }, 'diya+=0.65')
        .to(diya, { scale: 1, duration: 0.33, ease: 'sine.out' }, 'diya+=0.77')
        .to(tagline, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 'tagline')
        .to(templeGlow, { opacity: 1, duration: 0.35 }, 'background+=0.2')
        .to(halo, { opacity: 1, duration: 0.5 }, 'ganesha+=0.05')
        .to(particles, { opacity: 1, duration: 0.55 }, 'ganesha+=0.22')
        .to(smoke, { opacity: 1, duration: 0.5 }, 'shubh-=0.1')
        .to(petals, { opacity: 1, duration: 0.5 }, 'diya-=0.05')
        .to(diyaGlow, { opacity: 1, duration: 0.4 }, 'diya')
        .to(floorGlow, { opacity: 1, duration: 0.4 }, 'diya')
        .to(flameGlow, { opacity: 1, duration: 0.35 }, 'diya+=0.2')
        .to(reflection, { opacity: 1, duration: 0.45 }, 'diya+=0.1')
        .to(divider, { opacity: 0.75, scaleX: 1, duration: 0.5 }, 'tagline-=0.05')
        .to(veil, { opacity: 0.08, duration: 0.25, ease: 'sine.out' }, 'warmth')
        .to(veil, { opacity: 0.1, duration: 0.12, ease: 'sine.out' }, 'exit')
        .to(veil, { opacity: 0, duration: 0.3, ease: 'sine.inOut' }, 'exit+=0.12')
        .to(stage, { scale: 1.025, filter: 'blur(5px)', duration: 0.6, ease: 'power2.inOut' }, 'exit')
        .to(root, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 'exit')
    }, root)

    const images = [backgroundRef.current, ganeshaRef.current, diyaRef.current]
    waitForOpeningReady(images, abortController.signal)
      .then(({ imageStates, fontsReady }) => {
        if (!active) return
        imageStates.forEach((ready, index) => {
          if (!ready && images[index]) images[index].style.visibility = 'hidden'
        })
        if (!fontsReady) root.classList.add('opening-font-fallback')
        loadingExitTimeline.play(0)
      })
      .catch(() => {
        if (!active) return
        images.forEach((image) => {
          if (image) image.style.visibility = 'hidden'
        })
        root.classList.add('opening-font-fallback')
        loadingExitTimeline.play(0)
      })

    return () => {
      active = false
      abortController.abort()
      window.clearTimeout(fallbackTimer)
      context.revert()
    }
  }, [onExitStart, onComplete, reducedMotion])

  return (
    <section ref={rootRef} id="opening" className="opening-scene" aria-label="Opening blessing">
      <div className="opening-stage" data-opening-stage>
        <img
          ref={backgroundRef}
          className="opening-background"
          data-opening-bg
          src={openingAssets.background}
          alt=""
          width="941"
          height="1672"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="opening-overlay" aria-hidden="true" />
        <TempleGlow />
        <IncenseSmoke />
        <GoldenParticles />
        <ReflectionShimmer />
        <div className="opening-transition-veil" data-opening-veil aria-hidden="true" />

        <div className="opening-content">
          <div className="opening-upper-content">
            <p lang="hi" className="opening-ganesh-text" data-opening-mantra>
              ॥ श्री गणेशाय नमः ॥
            </p>

            <div className="opening-ganesha-wrap">
              <SacredHalo />
              <img
                ref={ganeshaRef}
                className="opening-ganesha"
                data-opening-ganesha
                src={openingAssets.ganesha}
                alt="Golden Lord Ganesha wedding blessing"
                width="1254"
                height="1254"
                loading="eager"
                decoding="async"
              />
            </div>

            <h1 lang="hi" className="opening-shubh-vivah" data-opening-shubh>
              ॥ शुभ विवाह ॥
            </h1>
            <p className="opening-blessing" data-opening-blessing>May every beginning be blessed...</p>
          </div>

          <div className="opening-diya-wrap">
            <DiyaAtmosphere />
            <img
              ref={diyaRef}
              className="opening-diya"
              data-opening-diya
              src={openingAssets.diya}
              alt="Traditional golden diya"
              width="1448"
              height="1086"
              loading="eager"
              decoding="async"
            />
          </div>

          <p className="opening-tagline" data-opening-tagline>
            A JOURNEY OF LOVE BEGINS...
            <RoyalDivider size="sm" className="opening-tagline-divider" data-opening-divider />
          </p>
        </div>
        <PetalField />
      </div>
      <div className="opening-loading" data-opening-loading aria-hidden="true" />
    </section>
  )
}
