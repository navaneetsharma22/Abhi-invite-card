import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { weddingData } from '../../data/weddingData'
import CelebrationsAtmosphere from './CelebrationsAtmosphere'
import './Celebrations.css'

export default function Celebrations() {
  const rootRef = useRef(null)
  const hasEnteredRef = useRef(false)
  const { haldi, wedding } = weddingData

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let observer
    let timeline

    const context = gsap.context(() => {
      const backgroundPush = root.querySelector('.celebrations-background-push')
      const background = root.querySelector('.celebrations-bg')
      const title = root.querySelector('.celebrations-title')
      const hindi = root.querySelector('.celebrations-hindi')
      const subtitle = root.querySelector('.celebrations-subtitle')

      const haldiCopy = root.querySelector('.celebration-haldi-copy')
      const haldiTitle = haldiCopy?.querySelector('.celebration-event-title')
      const haldiDate = haldiCopy?.querySelector('.celebration-event-date')
      const haldiRows = haldiCopy ? Array.from(haldiCopy.querySelectorAll('.celebration-detail-row')) : []
      const haldiDetails = [haldiDate, ...haldiRows].filter(Boolean)

      const weddingCopy = root.querySelector('.celebration-wedding-copy')
      const weddingTitle = weddingCopy?.querySelector('.celebration-event-title')
      const weddingDate = weddingCopy?.querySelector('.celebration-event-date')
      const weddingRows = weddingCopy ? Array.from(weddingCopy.querySelectorAll('.celebration-detail-row')) : []
      const weddingDetails = [weddingDate, ...weddingRows].filter(Boolean)

      const revealElements = [
        title,
        hindi,
        subtitle,
        haldiTitle,
        ...haldiDetails,
        weddingTitle,
        ...weddingDetails,
      ].filter(Boolean)

      // StrictMode safe: If already entered on remount, maintain revealed state
      if (hasEnteredRef.current) {
        gsap.set(revealElements, { opacity: 1, y: 0, x: 0, scale: 1, filter: 'none' })
        if (background) gsap.set(background, { scale: 1 })
        if (!reducedMotion && backgroundPush) {
          gsap.to(backgroundPush, {
            scale: 1.025,
            y: -2,
            duration: 16,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        }
        return
      }

      timeline = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          gsap.set(revealElements, { clearProps: 'willChange,filter' })
        },
      })

      if (reducedMotion) {
        gsap.set(revealElements, { opacity: 0 })
        timeline
          .to(title, { opacity: 1, duration: 0.4 }, 0.05)
          .to(hindi, { opacity: 1, duration: 0.35 }, 0.18)
          .to(subtitle, { opacity: 1, duration: 0.35 }, 0.30)
          .to(haldiTitle, { opacity: 1, duration: 0.35 }, 0.45)
          .to(haldiDetails, { opacity: 1, duration: 0.35, stagger: 0.06 }, 0.58)
          .to(weddingTitle, { opacity: 1, duration: 0.35 }, 0.82)
          .to(weddingDetails, { opacity: 1, duration: 0.35, stagger: 0.06 }, 0.95)
      } else {
        if (background) {
          gsap.set(background, { scale: 1.02, transformOrigin: 'center center' })
        }
        gsap.set(title, {
          opacity: 0,
          y: 24,
          scale: 0.96,
          filter: 'blur(5px)',
        })
        gsap.set([hindi, subtitle], {
          opacity: 0,
          y: 14,
        })
        gsap.set([haldiTitle, weddingTitle], {
          opacity: 0,
          x: 18,
          filter: 'blur(4px)',
        })
        gsap.set([...haldiDetails, ...weddingDetails], {
          opacity: 0,
          y: 10,
        })

        if (background) {
          timeline.to(background, { scale: 1, duration: 1.4, ease: 'power2.out' }, 0)
        }

        /* 1. “The Celebrations” */
        timeline.to(title, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: 'power3.out',
        }, 0.05)

        /* 2. Hindi line */
        timeline.to(hindi, {
          opacity: 1,
          y: 0,
          duration: 0.50,
        }, 0.28)

        /* 3. Subtitle */
        timeline.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.48,
        }, 0.46)

        /* 4. Haldi title */
        timeline.to(haldiTitle, {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.55,
        }, 0.72)

        /* 5. Haldi details */
        timeline.to(haldiDetails, {
          opacity: 1,
          y: 0,
          duration: 0.40,
          stagger: 0.09,
        }, 0.88)

        /* 6. Wedding title */
        timeline.to(weddingTitle, {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.55,
        }, 1.25)

        /* 7. Wedding details */
        timeline.to(weddingDetails, {
          opacity: 1,
          y: 0,
          duration: 0.40,
          stagger: 0.09,
        }, 1.40)

        /* ── Slow camera breathing ── */
        if (backgroundPush) {
          gsap.to(backgroundPush, {
            scale: 1.025,
            y: -2,
            duration: 16,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        }
      }

      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting || hasEnteredRef.current) return
        hasEnteredRef.current = true
        observer.disconnect()
        timeline?.play(0)
      }, { threshold: 0.35 })

      observer.observe(root)
    }, root)

    return () => {
      observer?.disconnect()
      context.revert()
    }
  }, [])

  return (
    <section
      id="celebrations"
      ref={rootRef}
      className="celebrations-section"
      aria-labelledby="celebrations-title"
    >
      <div className="celebrations-stage">
        {/* Background breathing push wrapper */}
        <div className="celebrations-background-push" aria-hidden="true">
          <img
            className="celebrations-bg"
            src="/celebration/celebrations-bg.webp"
            alt=""
            aria-hidden="true"
            width="935"
            height="1683"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Live Atmosphere Effects */}
        <CelebrationsAtmosphere />

        {/* ── Narrow cinematic seam feather (keeps Celebrations top crisp) ── */}
        <div className="celebrations-transition" aria-hidden="true" />

        {/* ── Header Overlay ────────────────────────────────────── */}
        <header className="celebrations-header">
          <h2 id="celebrations-title" className="celebrations-title">
            The Celebrations
          </h2>
          <p className="celebrations-hindi" lang="hi">
            रंगों से सजी, खुशियों से भरी
          </p>
          <p className="celebrations-subtitle">
            TWO BEAUTIFUL MOMENTS, ONE FOREVER STORY
          </p>
        </header>

        {/* ── Event 1: Haldi ────────────────────────────────────── */}
        <article className="celebration-haldi-copy" aria-labelledby="haldi-heading">
          <div className="celebration-event-header">
            <h3 id="haldi-heading" className="celebration-event-title">Haldi</h3>
            <p className="celebration-event-date">{haldi.date}</p>
          </div>

          <div className="celebration-event-spacer" aria-hidden="true" />

          <div className="celebration-event-details">
            <div className="celebration-detail-row">
              <span className="celebration-detail-icon celebration-detail-icon--time" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span className="celebration-detail-text celebration-detail-time">{haldi.time}</span>
            </div>

            <div className="celebration-detail-row">
              <span className="celebration-detail-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              <span className="celebration-detail-text celebration-detail-venue">{haldi.venue}</span>
            </div>

            <div className="celebration-detail-row celebration-detail-row--location">
              <span className="celebration-detail-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="celebration-detail-text celebration-detail-location">{haldi.location}</span>
            </div>
          </div>
        </article>

        {/* ── Event 2: Wedding ──────────────────────────────────── */}
        <article className="celebration-wedding-copy" aria-labelledby="wedding-heading">
          <div className="celebration-event-header">
            <h3 id="wedding-heading" className="celebration-event-title">Wedding</h3>
            <p className="celebration-event-date">{wedding.date}</p>
          </div>

          <div className="celebration-event-spacer" aria-hidden="true" />

          <div className="celebration-event-details">
            <div className="celebration-detail-row">
              <span className="celebration-detail-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6a3 3 0 0 1 6 0v6" />
                </svg>
              </span>
              <span className="celebration-detail-text celebration-detail-venue">{wedding.venue}</span>
            </div>

            <div className="celebration-detail-row celebration-detail-row--location">
              <span className="celebration-detail-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="celebration-detail-text celebration-detail-location">{wedding.location}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
