import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { weddingData } from '../../data/weddingData'
import RoyalDivider from '../../components/ui/RoyalDivider'
import FinalBlessingAtmosphere from './FinalBlessingAtmosphere'
import FinalBlessingPetals from './FinalBlessingPetals'
import './FinalBlessing.css'

export default function FinalBlessing() {
  const rootRef = useRef(null)
  const hasEnteredRef = useRef(false)
  const [petalsActive, setPetalsActive] = useState(false)

  const groomDisplayName = (weddingData.groom ? weddingData.groom.split(' ')[0] : 'SHAILENDRA').toUpperCase()
  const brideDisplayName = (weddingData.bride || 'KANCHAN').toUpperCase()
  const weddingDate = (weddingData.wedding?.date || '21 November 2026').toUpperCase()
  const locationName = 'KHADDA'

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let observer
    let timeline
    let breathingTween
    let inView = false

    const updateVisibility = () => {
      const isVisible = inView && !document.hidden
      if (breathingTween) {
        if (isVisible && hasEnteredRef.current) {
          if (breathingTween.paused()) breathingTween.resume()
        } else {
          if (!breathingTween.paused()) breathingTween.pause()
        }
      }
      root.classList.toggle('final-blessing--visible', isVisible)
    }

    const context = gsap.context(() => {
      const bgWrap = root.querySelector('.final-blessing-bg-wrap')
      const bgEl = root.querySelector('.final-blessing-bg')
      const quoteEl = root.querySelector('.final-blessing-quote')
      const topDividerEl = root.querySelector('.final-blessing-divider--top')
      const groomEl = root.querySelector('.final-blessing-name--groom')
      const ampersandEl = root.querySelector('.final-blessing-ampersand')
      const brideEl = root.querySelector('.final-blessing-name--bride')
      const dateEl = root.querySelector('.final-blessing-date')
      const locationEl = root.querySelector('.final-blessing-location')
      const bottomDividerEl = root.querySelector('.final-blessing-divider--bottom')
      const hindiEl = root.querySelector('.final-blessing-hindi')

      const revealElements = [
        quoteEl,
        topDividerEl,
        groomEl,
        ampersandEl,
        brideEl,
        dateEl,
        locationEl,
        bottomDividerEl,
        hindiEl,
      ].filter(Boolean)

      // Background breathing tween setup (Part 3)
      if (bgWrap && !reducedMotion) {
        breathingTween = gsap.to(bgWrap, {
          scale: 1.018,
          y: -2,
          duration: 20,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          paused: true,
        })
      }

      // StrictMode safe: If already entered on remount, maintain revealed state
      if (hasEnteredRef.current) {
        if (bgEl) gsap.set(bgEl, { opacity: 1, scale: 1 })
        gsap.set(revealElements, { opacity: 1, y: 0, scale: 1, scaleX: 1, filter: 'none' })
        setPetalsActive(true)
        if (inView && !document.hidden && !reducedMotion) {
          breathingTween?.play()
        }
        return
      }

      timeline = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          gsap.set([bgEl, ...revealElements], { clearProps: 'willChange,filter' })
        },
      })

      if (reducedMotion) {
        gsap.set([bgEl, ...revealElements], { opacity: 0 })
        timeline
          .to(bgEl, { opacity: 1, duration: 0.45 }, 0.05)
          .to(quoteEl, { opacity: 1, duration: 0.35 }, 0.20)
          .to(topDividerEl, { opacity: 1, duration: 0.30 }, 0.35)
          .to(groomEl, { opacity: 1, duration: 0.35 }, 0.45)
          .to(ampersandEl, { opacity: 1, duration: 0.25 }, 0.60)
          .to(brideEl, { opacity: 1, duration: 0.35 }, 0.70)
          .to(dateEl, { opacity: 1, duration: 0.30 }, 0.85)
          .to(locationEl, { opacity: 1, duration: 0.30 }, 0.95)
          .to(bottomDividerEl, { opacity: 1, duration: 0.30 }, 1.05)
          .to(hindiEl, { opacity: 1, duration: 0.35 }, 1.15)
      } else {
        /* Initial hidden states */
        gsap.set(bgEl, {
          opacity: 0,
          scale: 1.015,
        })
        gsap.set(quoteEl, {
          opacity: 0,
          y: 14,
          filter: 'blur(4px)',
        })
        gsap.set(topDividerEl, {
          opacity: 0,
          scaleX: 0.65,
          transformOrigin: 'center',
        })
        gsap.set([groomEl, brideEl], {
          opacity: 0,
          y: 22,
          scale: 0.965,
          filter: 'blur(5px)',
        })
        gsap.set(ampersandEl, {
          opacity: 0,
          scale: 0.88,
        })
        gsap.set([dateEl, locationEl], {
          opacity: 0,
          y: 10,
        })
        gsap.set(bottomDividerEl, {
          opacity: 0,
          scaleX: 0.65,
          transformOrigin: 'center',
        })
        gsap.set(hindiEl, {
          opacity: 0,
          y: 14,
          scale: 0.96,
          filter: 'blur(3px)',
        })

        /* 1. Background scene */
        timeline.to(bgEl, {
          opacity: 1,
          scale: 1,
          duration: 1.00,
          ease: 'power2.out',
        }, 0.00)

        /* 2. Top blessing message */
        timeline.to(quoteEl, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.60,
          ease: 'power3.out',
        }, 0.25)

        /* Top divider */
        timeline.to(topDividerEl, {
          opacity: 1,
          scaleX: 1,
          duration: 0.40,
          ease: 'power2.out',
        }, 0.45)

        /* 3. SHAILENDRA */
        timeline.to(groomEl, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.72,
          ease: 'power3.out',
        }, 0.65)

        /* 4. & (Ampersand) */
        timeline.to(ampersandEl, {
          opacity: 1,
          scale: 1,
          duration: 0.40,
          ease: 'power2.out',
        }, 0.95)

        /* 5. KANCHAN */
        timeline.to(brideEl, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.72,
          ease: 'power3.out',
        }, 1.10)

        /* 6. 21 NOVEMBER 2026 */
        timeline.to(dateEl, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        }, 1.40)

        /* Organically start petal finale wave around 1.50s into entrance */
        timeline.call(() => {
          setPetalsActive(true)
        }, null, 1.50)

        /* 7. KHADDA */
        timeline.to(locationEl, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        }, 1.50)

        /* 8. Small divider */
        timeline.to(bottomDividerEl, {
          opacity: 1,
          scaleX: 1,
          duration: 0.40,
          ease: 'power2.out',
        }, 1.65)

        /* 9. ॥ शुभ विवाह ॥ */
        timeline.to(hindiEl, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: 'power3.out',
        }, 1.75)
      }
    }, root)

    /* Observer handles initial entrance trigger AND offscreen pause */
    observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (entry.isIntersecting && !hasEnteredRef.current) {
        if (entry.intersectionRatio >= 0.35 || entry.isIntersecting) {
          hasEnteredRef.current = true
          timeline?.play(0)
          if (!reducedMotion) breathingTween?.play()
        }
      }
      updateVisibility()
    }, { threshold: [0, 0.38] })

    observer.observe(root)

    const handleVisibility = () => {
      updateVisibility()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      observer?.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      breathingTween?.kill()
      timeline?.kill()
      context.revert()
    }
  }, [])

  return (
    <section
      id="final-blessing"
      ref={rootRef}
      className="final-blessing-section"
      aria-label="Final Blessing and Invitation"
    >
      <div className="final-blessing-stage">
        {/* Layer 0 (z0): Cinematic Scene Background Canvas */}
        <div className="final-blessing-bg-wrap" aria-hidden="true">
          <img
            src="/images/final-blessing/final-bg.webp.png"
            alt=""
            className="final-blessing-bg"
            width="941"
            height="1672"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Minimal top transition feather from Venue section */}
        <div className="final-blessing-transition" aria-hidden="true" />

        {/* Layer 1 (z1): Live Night Atmosphere (moonlight, palace warmth, diyas, water shimmer, dust) */}
        <FinalBlessingAtmosphere />

        {/* Layer 2 (z2): Real HTML Text Content (stationary after entrance) */}
        <div className="final-blessing-content">
          {/* Top Blessing */}
          <p className="final-blessing-quote">
            <span>WITH LOVE IN OUR HEARTS,</span>
            <span>WE AWAIT YOUR PRESENCE.</span>
          </p>

          <RoyalDivider size="sm" className="final-blessing-divider final-blessing-divider--top" />

          {/* Couple Names */}
          <div className="final-blessing-names">
            <span className="final-blessing-name final-blessing-name--groom">{groomDisplayName}</span>
            <span className="final-blessing-ampersand">&amp;</span>
            <span className="final-blessing-name final-blessing-name--bride">{brideDisplayName}</span>
          </div>

          {/* Date & Location */}
          <div className="final-blessing-meta">
            <p className="final-blessing-date">{weddingDate}</p>
            <p className="final-blessing-location">{locationName}</p>
          </div>

          <RoyalDivider size="sm" className="final-blessing-divider final-blessing-divider--bottom" />

          {/* Ceremonial Hindi Blessing */}
          <p className="final-blessing-hindi" lang="hi">
            ॥ शुभ विवाह ॥
          </p>
        </div>

        {/* Layer 3 & 4 (z3 & z4): Petal Journey Finale & Settled Petal Bed */}
        <FinalBlessingPetals active={petalsActive} />
      </div>
    </section>
  )
}
