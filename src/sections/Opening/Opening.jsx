import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Opening.css'

const openingAssets = {
  background: '/images/opening/opening-bg.webp.png',
  ganesha: '/images/opening/ganesha.webp.png',
  diya: '/images/opening/diya.webp.png',
}

export default function Opening({ onComplete }) {
  const rootRef = useRef(null)
  const completedRef = useRef(false)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    let active = true
    const shouldReduceMotion = reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      const stage = root.querySelector('[data-opening-stage]')
      const background = root.querySelector('[data-opening-bg]')
      const mantra = root.querySelector('[data-opening-mantra]')
      const ganesha = root.querySelector('[data-opening-ganesha]')
      const shubh = root.querySelector('[data-opening-shubh]')
      const blessing = root.querySelector('[data-opening-blessing]')
      const diya = root.querySelector('[data-opening-diya]')
      const tagline = root.querySelector('[data-opening-tagline]')
      const veil = root.querySelector('[data-opening-veil]')

      const finish = () => {
        if (!active || completedRef.current) return
        completedRef.current = true
        onComplete?.()
      }

      gsap.set(root, { opacity: 1 })
      gsap.set(stage, { scale: 1, filter: 'blur(0px)' })
      gsap.set(background, { opacity: 0, scale: shouldReduceMotion ? 1 : 1.02, yPercent: 0, transformOrigin: 'center center' })
      gsap.set(veil, { opacity: 0 })

      if (shouldReduceMotion) {
        gsap.set([mantra, ganesha, shubh, blessing, diya, tagline], { opacity: 0 })

        const timeline = gsap.timeline({ onComplete: finish })
        timeline
          .addLabel('background', 0)
          .addLabel('mantra', 0.25)
          .addLabel('ganesha', 0.55)
          .addLabel('shubh', 0.9)
          .addLabel('blessing', 1.1)
          .addLabel('diya', 1.3)
          .addLabel('tagline', 1.55)
          .addLabel('breathe', 2)
          .addLabel('exit', 3)
          .to(background, { opacity: 1, duration: 0.45 }, 'background')
          .to(mantra, { opacity: 1, duration: 0.45 }, 'mantra')
          .to(ganesha, { opacity: 1, duration: 0.55 }, 'ganesha')
          .to(shubh, { opacity: 1, duration: 0.45 }, 'shubh')
          .to(blessing, { opacity: 1, duration: 0.45 }, 'blessing')
          .to(diya, { opacity: 1, duration: 0.55 }, 'diya')
          .to(tagline, { opacity: 1, duration: 0.45 }, 'tagline')
          .to(root, { opacity: 0, duration: 0.55, ease: 'power1.inOut' }, 'exit')

        return
      }

      gsap.set(mantra, { opacity: 0, y: 14, filter: 'blur(5px)' })
      gsap.set(ganesha, { opacity: 0, scale: 0.9, y: 8, filter: 'blur(7px) brightness(.75)' })
      gsap.set(shubh, { opacity: 0, y: 12, filter: 'blur(4px)' })
      gsap.set(blessing, { opacity: 0, y: 10, filter: 'blur(4px)' })
      gsap.set(diya, { opacity: 0, y: 28, scale: 0.93 })
      gsap.set(tagline, { opacity: 0, y: 10 })

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: finish,
      })

      timeline
        .addLabel('background', 0)
        .addLabel('mantra', 0.28)
        .addLabel('ganesha', 0.48)
        .addLabel('shubh', 1)
        .addLabel('blessing', 1.18)
        .addLabel('diya', 1.35)
        .addLabel('tagline', 1.75)
        .addLabel('breathe', 2.2)
        .addLabel('warmth', 3.15)
        .addLabel('exit', 3.4)
        .to(background, { opacity: 1, duration: 0.55 }, 'background')
        .to(background, { scale: 1.055, yPercent: -0.5, duration: 3.9, ease: 'none' }, 'background')
        .to(mantra, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55 }, 'mantra')
        .to(ganesha, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px) brightness(1)', duration: 0.75 }, 'ganesha')
        .to(ganesha, { scale: 1.012, y: -2, duration: 0.14, ease: 'sine.out' }, 'ganesha+=0.75')
        .to(ganesha, { scale: 1, y: 0, duration: 0.46, ease: 'sine.out' }, 'ganesha+=0.89')
        .to(shubh, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.48 }, 'shubh')
        .to(blessing, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.52, ease: 'power2.out' }, 'blessing')
        .to(diya, { opacity: 1, y: 0, scale: 1, duration: 0.65 }, 'diya')
        .to(diya, { scale: 1.015, duration: 0.12, ease: 'sine.out' }, 'diya+=0.65')
        .to(diya, { scale: 1, duration: 0.33, ease: 'sine.out' }, 'diya+=0.77')
        .to(tagline, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 'tagline')
        .to(veil, { opacity: 0.08, duration: 0.25, ease: 'sine.out' }, 'warmth')
        .to(veil, { opacity: 0.1, duration: 0.12, ease: 'sine.out' }, 'exit')
        .to(veil, { opacity: 0, duration: 0.3, ease: 'sine.inOut' }, 'exit+=0.12')
        .to(stage, { scale: 1.025, filter: 'blur(5px)', duration: 0.6, ease: 'power2.inOut' }, 'exit')
        .to(root, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 'exit')
    }, root)

    return () => {
      active = false
      context.revert()
    }
  }, [onComplete, reducedMotion])

  return (
    <section ref={rootRef} id="opening" className="opening-scene" aria-label="Opening blessing">
      <div className="opening-stage" data-opening-stage>
        <img
          className="opening-background"
          data-opening-bg
          src={openingAssets.background}
          alt=""
          width="941"
          height="1672"
          loading="eager"
          fetchPriority="high"
        />
        <div className="opening-overlay" aria-hidden="true" />
        <div className="opening-transition-veil" data-opening-veil aria-hidden="true" />

        <div className="opening-content">
          <div className="opening-upper-content">
            <p lang="hi" className="opening-ganesh-text" data-opening-mantra>
              ॥ श्री गणेशाय नमः ॥
            </p>

            <div className="opening-ganesha-wrap">
              <img
                className="opening-ganesha"
                data-opening-ganesha
                src={openingAssets.ganesha}
                alt="Golden Lord Ganesha wedding blessing"
                width="1254"
                height="1254"
                loading="eager"
              />
            </div>

            <h1 lang="hi" className="opening-shubh-vivah" data-opening-shubh>
              ॥ शुभ विवाह ॥
            </h1>
            <p className="opening-blessing" data-opening-blessing>May every beginning be blessed...</p>
          </div>

          <div className="opening-diya-wrap">
            <img
              className="opening-diya"
              data-opening-diya
              src={openingAssets.diya}
              alt="Traditional golden diya"
              width="1448"
              height="1086"
              loading="eager"
            />
          </div>

          <p className="opening-tagline" data-opening-tagline>A JOURNEY OF LOVE BEGINS...</p>
        </div>
      </div>
    </section>
  )
}
