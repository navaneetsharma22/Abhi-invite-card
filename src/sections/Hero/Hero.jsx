import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, CalendarDays, ChevronDown, MapPin, Menu, Music2 } from 'lucide-react'
import { PrimaryButton } from '../../components/ui/Button'
import IconButton from '../../components/ui/IconButton'
import { weddingData } from '../../data/weddingData'
import './Hero.css'

const monthNames = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]
const dayInMilliseconds = 24 * 60 * 60 * 1000

function calendarDaysUntil(dateText) {
  const [dayText, monthText, yearText] = dateText.trim().split(/\s+/)
  const month = monthNames.indexOf(monthText?.toLowerCase())
  if (month < 0) return null

  const day = Number(dayText)
  const year = Number(yearText)
  if (!Number.isInteger(day) || !Number.isInteger(year)) return null

  const now = new Date()
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const weddingDay = Date.UTC(year, month, day)
  return Math.round((weddingDay - today) / dayInMilliseconds)
}

function DateCountdown() {
  const days = calendarDaysUntil(weddingData.wedding.date)

  return (
    <div className="hero-countdown" aria-label={days > 0 ? `${days} days until the wedding` : undefined}>
      {days > 0 ? (
        <>
          <span className="hero-countdown__number">{days}</span>
          <span className="hero-countdown__label">DAYS<br />TO GO</span>
        </>
      ) : (
        <span className="hero-countdown__message">{days === 0 ? 'TODAY IS THE DAY' : 'OUR FOREVER BEGINS'}</span>
      )}
    </div>
  )
}

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
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      if (active && hasEnteredRef.current) return

      const background = root.querySelector('.hero-background')
      const couple = root.querySelector('.hero-couple')
      const eyebrow = root.querySelector('.hero-eyebrow')
      const groom = root.querySelector('.hero-names__groom')
      const ampersand = root.querySelector('.hero-names__ampersand')
      const bride = root.querySelector('.hero-names__bride')
      const copy = root.querySelector('.hero-invite-copy')
      const details = root.querySelector('.hero-wedding-info')
      const detailRows = root.querySelectorAll('.hero-info-row')
      const countdown = root.querySelector('.hero-countdown')
      const cta = root.querySelector('.hero-cta')
      const controls = root.querySelectorAll('.hero-top-controls .icon-button')
      const scrollHint = root.querySelector('.hero-scroll-hint')
      const chevron = root.querySelector('.hero-scroll-hint__icon')

      gsap.set(root, { opacity: 1 })
      gsap.set(background, {
        opacity: .72,
        scale: reducedMotion ? 1 : 1.055,
        filter: 'brightness(.78) saturate(.88)',
        transformOrigin: 'center center',
      })
      gsap.set(couple, reducedMotion
        ? { opacity: 0, x: 0, y: 0, scale: 1, filter: 'none' }
        : { opacity: 0, x: 14, y: 28, scale: .965, filter: 'blur(4px)' })
      gsap.set([eyebrow, groom, ampersand, bride, copy, details, countdown, cta, scrollHint, ...controls, ...detailRows], { opacity: 0 })

      if (!active) return
      hasEnteredRef.current = true

      if (reducedMotion) {
        const timeline = gsap.timeline({ onComplete: () => { completed = true } })
        timeline
          .addLabel('heroReveal', 0)
          .addLabel('couple', .12)
          .addLabel('eyebrow', .22)
          .addLabel('names', .34)
          .addLabel('copy', .57)
          .addLabel('details', .7)
          .addLabel('countdown', .85)
          .addLabel('cta', .98)
          .addLabel('controls', 1.08)
          .addLabel('scroll', 1.18)
          .to(background, { opacity: 1, filter: 'brightness(1) saturate(1)', duration: .55 }, 'heroReveal')
          .to(couple, { opacity: 1, duration: .5 }, 'couple')
          .to(eyebrow, { opacity: 1, duration: .35 }, 'eyebrow')
          .to(groom, { opacity: 1, duration: .4 }, 'names')
          .to(ampersand, { opacity: 1, duration: .35 }, 'names+=.1')
          .to(bride, { opacity: 1, duration: .4 }, 'names+=.2')
          .to(copy, { opacity: 1, duration: .35 }, 'copy')
          .to(details, { opacity: 1, duration: .3 }, 'details')
          .to(detailRows, { opacity: 1, duration: .3, stagger: .08 }, 'details+=.05')
          .to(countdown, { opacity: 1, duration: .3 }, 'countdown')
          .to(cta, { opacity: 1, duration: .3 }, 'cta')
          .to(controls, { opacity: 1, duration: .3, stagger: .06 }, 'controls')
          .to(scrollHint, { opacity: 1, duration: .3 }, 'scroll')
        return
      }

      gsap.set(eyebrow, { y: 10, filter: 'blur(3px)' })
      gsap.set([groom, bride], { y: 18, filter: 'blur(5px)' })
      gsap.set(ampersand, { y: 5, scale: .88 })
      gsap.set(copy, { y: 10 })
      gsap.set(details, { y: 12 })
      gsap.set(detailRows, { y: 8 })
      gsap.set(countdown, { y: 8, scale: .97 })
      gsap.set(cta, { y: 14, scale: .98 })
      gsap.set(controls, { y: -8, scale: .96 })
      gsap.set(scrollHint, { y: 8 })

      const chevronMotion = gsap.to(chevron, {
        y: 3, duration: 1, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true,
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          completed = true
          chevronMotion.play()
        },
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
        .addLabel('cta', 1.44)
        .addLabel('controls', 1.6)
        .addLabel('scroll', 1.82)
        .to(background, { opacity: 1, scale: 1.025, filter: 'brightness(1) saturate(1)', duration: .9, ease: 'power2.out' }, 'heroReveal')
        .to(couple, { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)', duration: .85 }, 'couple')
        .to(couple, { y: -2, scale: 1.008, duration: .16, ease: 'sine.out' }, 'couple+=.85')
        .to(couple, { y: 0, scale: 1, duration: .42, ease: 'sine.out' }, 'couple+=1.01')
        .to(eyebrow, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .5 }, 'eyebrow')
        .to(groom, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .62 }, 'groom')
        .to(ampersand, { opacity: 1, y: 0, scale: 1, duration: .4, ease: 'sine.out' }, 'ampersand')
        .to(bride, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .55 }, 'bride')
        .to(copy, { opacity: 1, y: 0, duration: .5 }, 'copy')
        .to(details, { opacity: 1, y: 0, duration: .42 }, 'details')
        .to(detailRows, { opacity: 1, y: 0, duration: .42, stagger: .1 }, 'details+=.05')
        .to(countdown, { opacity: 1, y: 0, scale: 1, duration: .5 }, 'countdown')
        .to(cta, { opacity: 1, y: 0, scale: 1, duration: .5 }, 'cta')
        .to(controls, { opacity: 1, y: 0, scale: 1, duration: .4, stagger: .08 }, 'controls')
        .to(scrollHint, { opacity: 1, y: 0, duration: .45 }, 'scroll')

      gsap.to(background, { scale: 1, duration: 2.7, delay: .9, ease: 'sine.out' })
    }, root)

    return () => {
      context.revert()
      if (active && !completed) hasEnteredRef.current = false
    }
  }, [active])

  return (
    <section ref={rootRef} id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-stage">
        <img
          className="hero-background"
          src="/images/hero/hero-bg.webp.png"
          alt=""
          width="941"
          height="1672"
          loading="eager"
          decoding="async"
        />
        <div className="hero-image-overlay" aria-hidden="true" />

        <div className="hero-couple">
          <img
            src="/images/hero/couple.webp.webp"
            alt={`${weddingData.bride} and ${weddingData.groom}`}
            width="1024"
            height="1536"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="hero-top-controls">
          <IconButton label="Toggle wedding music" disabled><Music2 size={19} strokeWidth={1.6} /></IconButton>
          <IconButton label="Open invitation menu" disabled><Menu size={20} strokeWidth={1.6} /></IconButton>
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <LotusMark />
              <span>TOGETHER WITH THEIR FAMILIES</span>
            </div>

            <h1 id="hero-title" className="hero-names">
              <span className="hero-names__groom">{weddingData.groom}</span>
              <span className="hero-names__ampersand">&amp;</span>
              <span className="hero-names__bride">{weddingData.bride}</span>
            </h1>

            <p className="hero-invite-copy">Invite you to celebrate<br />their wedding</p>

            <div className="hero-wedding-info">
              <div className="hero-info-row">
                <CalendarDays size={17} strokeWidth={1.5} aria-hidden="true" />
                <span className="hero-info-date">{weddingData.wedding.date}</span>
              </div>
              <div className="hero-info-row hero-info-row--venue">
                <MapPin size={17} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span className="hero-info-venue">{weddingData.wedding.venue}</span>
                  <span className="hero-info-address">{weddingData.wedding.location}</span>
                </div>
              </div>
            </div>

            <DateCountdown />

            <PrimaryButton href="#invitation" className="hero-cta">
              EXPERIENCE OUR STORY <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
            </PrimaryButton>
          </div>
        </div>

        <a className="hero-scroll-hint" href="#invitation">
          <span>SCROLL DOWN</span>
          <span className="hero-scroll-hint__icon"><ChevronDown size={17} strokeWidth={1.6} aria-hidden="true" /></span>
        </a>
      </div>
    </section>
  )
}
