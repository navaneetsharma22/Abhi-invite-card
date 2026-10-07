import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CalendarDays, MapPin } from 'lucide-react'
import { weddingData } from '../../data/weddingData'
import HeroAtmosphere from './HeroAtmosphere'
import HeroCountdown from './HeroCountdown'
import HeroControls from './HeroControls'
import { createHeroMotion } from './heroMotion'
import './Hero.css'

function LotusMark() {
  return (
    <svg className="hero-lotus" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M16 20c-4-4-4-9 0-15 4 6 4 11 0 15Z" />
      <path d="M16 20C9 19 5 15 4 9c7 1 11 5 12 11Zm0 0c7-1 11-5 12-11-7 1-11 5-12 11Z" />
      <path d="M3 20c5 2 9 2 13 0 4 2 8 2 13 0" />
    </svg>
  )
}

export default function Hero({ active = false }) {
  const rootRef = useRef(null)
  const hasEnteredRef = useRef(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    let completed = false
    let cleanupMotion = () => {}
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      if (active && hasEnteredRef.current) return

      const background = root.querySelector('.hero-camera-plane')
      const couple = root.querySelector('.hero-couple')
      const eyebrow = root.querySelector('.hero-eyebrow')
      const groom = root.querySelector('.hero-names__groom')
      const ampersand = root.querySelector('.hero-names__ampersand')
      const bride = root.querySelector('.hero-names__bride')
      const copy = root.querySelector('.hero-invite-copy')
      const details = root.querySelector('.hero-wedding-info')
      const detailRows = root.querySelectorAll('.hero-info-row')
      const countdown = root.querySelector('.hero-countdown')
      const controls = root.querySelectorAll('.hero-top-controls .icon-button')
      const scrollHint = root.querySelector('.hero-scroll-hint')

      gsap.set(root, { opacity: 1 })
      gsap.set(background, {
        opacity: .72,
        scale: reducedMotion ? 1 : 1.04,
        transformOrigin: 'center center',
      })
      gsap.set(couple, reducedMotion
        ? { opacity: 0, x: 0, y: 0, scale: 1 }
        : { opacity: 0, x: 8, y: 16, scale: .985 })
      gsap.set([eyebrow, groom, ampersand, bride, copy, details, countdown, scrollHint, ...controls, ...detailRows], { opacity: 0 })

      if (!active) return
      hasEnteredRef.current = true
      root.classList.add('hero-entrance--active')
      const finishEntrance = () => {
        completed = true
        root.classList.remove('hero-entrance--active')
        root.classList.add('hero-atmosphere--live')
        cleanupMotion = createHeroMotion(root)
      }

      if (reducedMotion) {
        const timeline = gsap.timeline({ onComplete: finishEntrance })
        timeline
          .addLabel('heroReveal', 0)
          .addLabel('couple', .12)
          .addLabel('eyebrow', .22)
          .addLabel('names', .34)
          .addLabel('copy', .57)
          .addLabel('details', .7)
          .addLabel('countdown', .85)
          .addLabel('controls', 1.08)
          .addLabel('scroll', 1.18)
          .to(background, { opacity: 1, duration: .55 }, 'heroReveal')
          .to(couple, { opacity: 1, duration: .5 }, 'couple')
          .to(eyebrow, { opacity: 1, duration: .35 }, 'eyebrow')
          .to(groom, { opacity: 1, duration: .4 }, 'names')
          .to(ampersand, { opacity: 1, duration: .35 }, 'names+=.1')
          .to(bride, { opacity: 1, duration: .4 }, 'names+=.2')
          .to(copy, { opacity: 1, duration: .35 }, 'copy')
          .to(details, { opacity: 1, duration: .3 }, 'details')
          .to(detailRows, { opacity: 1, duration: .3, stagger: .08 }, 'details+=.05')
          .to(countdown, { opacity: 1, duration: .3 }, 'countdown')
          .to(controls, { opacity: 1, duration: .3, stagger: .06 }, 'controls')
          .to(scrollHint, { opacity: 1, duration: .3 }, 'scroll')
        return
      }

      gsap.set(eyebrow, { y: 8 })
      gsap.set([groom, bride], { y: 12 })
      gsap.set(ampersand, { y: 5, scale: .88 })
      gsap.set(copy, { y: 10 })
      gsap.set(details, { y: 8 })
      gsap.set(detailRows, { y: 6 })
      gsap.set(countdown, { y: 6, scale: .985 })
      gsap.set(controls, { y: -5, scale: .98 })
      gsap.set(scrollHint, { y: 6 })

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: finishEntrance,
      })
      timeline
        .addLabel('heroReveal', 0)
        .addLabel('couple', .1)
        .addLabel('eyebrow', .25)
        .addLabel('groom', .38)
        .addLabel('ampersand', .55)
        .addLabel('bride', .7)
        .addLabel('copy', .9)
        .addLabel('details', 1.08)
        .addLabel('countdown', 1.25)
        .addLabel('controls', 1.6)
        .addLabel('scroll', 1.82)
        .to(background, { opacity: 1, scale: 1.025, duration: .9, ease: 'power2.out' }, 'heroReveal')
        .to(couple, { opacity: 1, x: 0, y: 0, scale: 1, duration: 1 }, 'couple')
        .to(eyebrow, { opacity: 1, y: 0, duration: .5 }, 'eyebrow')
        .to(groom, { opacity: 1, y: 0, duration: .62 }, 'groom')
        .to(ampersand, { opacity: 1, y: 0, scale: 1, duration: .4, ease: 'sine.out' }, 'ampersand')
        .to(bride, { opacity: 1, y: 0, duration: .55 }, 'bride')
        .to(copy, { opacity: 1, y: 0, duration: .5 }, 'copy')
        .to(details, { opacity: 1, y: 0, duration: .42 }, 'details')
        .to(detailRows, { opacity: 1, y: 0, duration: .42, stagger: .1 }, 'details+=.05')
        .to(countdown, { opacity: 1, y: 0, scale: 1, duration: .5 }, 'countdown')
        .to(controls, { opacity: 1, y: 0, scale: 1, duration: .4, stagger: .08 }, 'controls')
        .to(scrollHint, { opacity: 1, y: 0, duration: .45 }, 'scroll')
    }, root)

    return () => {
      cleanupMotion()
      root.classList.remove('hero-atmosphere--live', 'hero-entrance--active')
      context.revert()
      if (active && !completed) hasEnteredRef.current = false
    }
  }, [active])

  return (
    <section ref={rootRef} id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-camera-plane" aria-hidden="true">
          <div className="hero-background-motion">
            <img
              className="hero-background"
              src="/images/hero/hero-bg.webp.png"
              alt=""
              width="941"
              height="1672"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
        <div className="hero-image-overlay" aria-hidden="true" />
        <HeroAtmosphere />

        <div className="hero-couple">
          <div className="hero-couple-motion">
            <img
              src="/images/hero/couple.webp.webp"
              alt={`${weddingData.bride} and ${weddingData.groom}`}
              width="1024"
              height="1536"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        <HeroControls />

        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-block hero-block--heading">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow__mark">
                  <LotusMark />
                  <span className="hero-eyebrow__rule" aria-hidden="true" />
                </span>
                <span>TOGETHER WITH THEIR FAMILIES</span>
              </div>

              <h1 id="hero-title" className="hero-names">
                <span className="hero-names__groom">{weddingData.groom.split(' ')[0]}</span>
                <span className="hero-names__ampersand">&amp;</span>
                <span className="hero-names__bride">{weddingData.bride}</span>
              </h1>

              <p className="hero-invite-copy">Invite you to celebrate<br />their wedding</p>
            </div>

            <div className="hero-wedding-info">
              <span className="hero-ornament-divider" aria-hidden="true" />
              <div className="hero-info-row">
                <CalendarDays size={15} strokeWidth={1.25} aria-hidden="true" />
                <span className="hero-info-date">{weddingData.wedding.date}</span>
              </div>
              <div className="hero-info-row hero-info-row--venue">
                <MapPin size={15} strokeWidth={1.25} aria-hidden="true" />
                <div>
                  <span className="hero-info-venue">{weddingData.wedding.venue}</span>
                  <span className="hero-info-address">{weddingData.wedding.location}</span>
                </div>
              </div>
            </div>

            <HeroCountdown active={active} />
          </div>
        </div>

        <a className="hero-scroll-hint" href="#invitation">
          <span className="hero-scroll-hint__line" aria-hidden="true" />
          <span>SCROLL DOWN</span>
        </a>
      </div>
    </section>
  )
}
