import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { weddingData } from '../../data/weddingData'
import RoyalDivider from '../../components/ui/RoyalDivider'
import CoupleAtmosphere from './CoupleAtmosphere'
import './Couple.css'

export default function Couple() {
  const rootRef = useRef(null)
  const hasEnteredRef = useRef(false)
  const { groom, bride } = weddingData
  const groomPhoto = '/images/couple/Groom Portrait Cutout for Wedding Invitation.png'
  const bridePhoto = '/images/couple/Faithful bridal portrait on transparent background.png'
  const flowerPhotoLeft = '/images/couple/couple-flower-left.png.png'
  const flowerPhotoRight = '/images/couple/couple-flower-right.png.png'

  // Display first name for groom (Shailendra) and bride (Kanchan)
  const groomDisplayName = groom.split(' ')[0]
  const brideDisplayName = bride

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let observer
    let portraitObserver
    let backgroundObserver
    let timeline
    let breathingTween
    let portraitFrame = 0
    let portraitsInView = false
    let backgroundInView = false

    const portraitParallax = () => {
      if (portraitFrame || reducedMotion || !portraitsInView || document.hidden) return
      portraitFrame = window.requestAnimationFrame(() => {
        portraitFrame = 0
        const rect = root.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)))
        const travel = window.innerWidth <= 440 ? 1.5 : 3
        const translateY = ((progress * 2) - 1) * travel
        root.style.setProperty('--couple-portrait-scroll-y', `${translateY.toFixed(2)}px`)
      })
    }

    const onVisibilityChange = () => {
      if (document.hidden && portraitFrame) {
        window.cancelAnimationFrame(portraitFrame)
        portraitFrame = 0
      }
      if (document.hidden) {
        breathingTween?.pause()
      } else {
        if (backgroundInView) breathingTween?.play()
        portraitParallax()
      }
    }

    const context = gsap.context(() => {
      const title = root.querySelector('.couple-title')
      const subtitle = root.querySelector('.couple-subtitle')
      const topDivider = root.querySelector('.couple-divider--top')
      const groomPortrait = root.querySelector('.couple-portrait-entrance--groom')
      const bridePortrait = root.querySelector('.couple-portrait-entrance--bride')
      const groomCard = root.querySelector('.couple-card--groom')
      const brideCard = root.querySelector('.couple-card--bride')
      const bottomDivider = root.querySelector('.couple-divider--bottom')
      const tagline = root.querySelector('.couple-tagline')
      const taglineBloom = root.querySelector('.couple-tagline-bloom')
      const backgroundPush = root.querySelector('.couple-background-push')
      const flowerLayer = root.querySelector('.couple-flower-layer')
      const breathingTargets = [backgroundPush, flowerLayer].filter(Boolean)

      const revealElements = [
        title,
        subtitle,
        topDivider,
        groomPortrait,
        bridePortrait,
        groomCard,
        brideCard,
        bottomDivider,
        tagline,
      ].filter(Boolean)

      // StrictMode safe: If already entered on remount, maintain revealed state
      if (hasEnteredRef.current) {
        gsap.set(revealElements, { opacity: 1, y: 0, scale: 1, filter: 'none' })
        if (taglineBloom) gsap.set(taglineBloom, { opacity: 0.05, scale: 1 })
        if (breathingTargets.length && !reducedMotion) {
          breathingTween = gsap.to(breathingTargets, {
            scale: 1.022,
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
          .to(title, { opacity: 1, duration: 0.40 }, 0.05)
          .to(subtitle, { opacity: 1, duration: 0.35 }, 0.18)
          .to(topDivider, { opacity: 1, duration: 0.35 }, 0.30)
          .to([groomPortrait, bridePortrait], { opacity: 1, duration: 0.35, stagger: 0.10 }, 0.42)
          .to(groomCard, { opacity: 1, duration: 0.35 }, 0.62)
          .to(brideCard, { opacity: 1, duration: 0.35 }, 0.74)
          .to(bottomDivider, { opacity: 1, duration: 0.35 }, 0.88)
          .to(tagline, { opacity: 1, duration: 0.40 }, 1.00)
      } else {
        /* Initial hidden states */
        gsap.set(title, {
          opacity: 0,
          y: -5,
          scale: 0.96,
          filter: 'blur(5px)',
        })
        gsap.set([subtitle, topDivider, bottomDivider], {
          opacity: 0,
          y: 10,
        })
        gsap.set([groomPortrait, bridePortrait], {
          opacity: 0,
          y: 10,
        })
        gsap.set([groomCard, brideCard], {
          opacity: 0,
          y: 14,
          filter: 'blur(3px)',
        })
        gsap.set(tagline, {
          opacity: 0,
          scale: 0.97,
          y: 12,
        })
        if (taglineBloom) {
          gsap.set(taglineBloom, {
            opacity: 0,
            scale: 0.88,
          })
        }

        /* 1. “The Couple” */
        timeline.to(title, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: 'power3.out',
        }, 0.05)

        /* 2. “TWO SOULS, ONE STORY” */
        timeline.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.45,
        }, 0.28)

        /* 3. Top divider */
        timeline.to(topDivider, {
          opacity: 1,
          y: 0,
          duration: 0.45,
        }, 0.45)

        /* 4. Groom portrait slot/frame area */
        timeline.to(groomPortrait, {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: 'power2.out',
        }, 0.65)

        /* 5. Bride portrait slot/frame area (stagger ~.12s) */
        timeline.to(bridePortrait, {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: 'power2.out',
        }, 0.77)

        /* 6. Shailendra + THE GROOM */
        timeline.to(groomCard, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.50,
        }, 0.95)

        /* 7. Kanchan + THE BRIDE */
        timeline.to(brideCard, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.50,
        }, 1.10)

        /* 8. Lower divider/lotus */
        timeline.to(bottomDivider, {
          opacity: 1,
          y: 0,
          duration: 0.45,
        }, 1.30)

        /* 9. “Better Together” */
        timeline.to(tagline, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.60,
        }, 1.45)

        /* Optional one-time subtle gold bloom behind tagline */
        if (taglineBloom) {
          timeline
            .to(taglineBloom, {
              opacity: 0.22,
              scale: 1.08,
              duration: 0.70,
              ease: 'power2.out',
            }, 1.70)
            .to(taglineBloom, {
              opacity: 0.05,
              scale: 1.0,
              duration: 0.80,
              ease: 'power2.inOut',
            }, 2.40)
        }

        /* ── Slow camera breathing (starts upon entrance reveal) ── */
        if (breathingTargets.length) {
          breathingTween = gsap.to(breathingTargets, {
            scale: 1.022,
            y: -2,
            duration: 16,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            paused: true,
          })
        }
      }

      /* Trigger once when ~35-40% enters viewport */
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting || hasEnteredRef.current) return
        hasEnteredRef.current = true
        observer.disconnect()
        timeline?.play(0)
        breathingTween?.play()
      }, { threshold: 0.38 })


      observer.observe(root)
    }, root)

    backgroundObserver = new IntersectionObserver(([entry]) => {
      backgroundInView = entry.isIntersecting
      if (backgroundInView && !document.hidden) breathingTween?.play()
      else breathingTween?.pause()
    }, { threshold: 0.05 })
    backgroundObserver.observe(root)

    portraitObserver = new IntersectionObserver(([entry]) => {
      portraitsInView = entry.isIntersecting
      if (portraitsInView) portraitParallax()
      else if (portraitFrame) {
        window.cancelAnimationFrame(portraitFrame)
        portraitFrame = 0
      }
    })
    portraitObserver.observe(root)

    if (!reducedMotion) {
      window.addEventListener('scroll', portraitParallax, { passive: true })
      window.addEventListener('resize', portraitParallax, { passive: true })
      document.addEventListener('visibilitychange', onVisibilityChange)
    }

    return () => {
      observer?.disconnect()
      portraitObserver?.disconnect()
      backgroundObserver?.disconnect()
      window.removeEventListener('scroll', portraitParallax)
      window.removeEventListener('resize', portraitParallax)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (portraitFrame) window.cancelAnimationFrame(portraitFrame)
      context.revert()
    }
  }, [])


  return (
    <section
      id="couple"
      ref={rootRef}
      className="couple-section"
      aria-labelledby="couple-title"
    >
      <div className="couple-stage">
        {/* Background breathing push wrapper */}
        <div className="couple-background-push" aria-hidden="true">
          <img
            className="couple-bg"
            src="/images/couple/couple-bg.webp.png"
            alt=""
            aria-hidden="true"
            width="941"
            height="1672"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Live Atmosphere Effects */}
        <CoupleAtmosphere />

        {/* Minimal seam feather */}
        <div className="couple-transition" aria-hidden="true" />

        {/* ── Main Header ── */}
        <header className="couple-header">
          <div className="couple-title-reserve" aria-hidden="true" />
          <p className="couple-subtitle">
            TWO SOULS, ONE STORY
          </p>
          <RoyalDivider size="sm" className="couple-divider couple-divider--top" />
        </header>

        <h2 id="couple-title" className="couple-title script-display">
          The Couple
        </h2>

        <div className="couple-portrait-layer">
          {/* ── Portrait Frame Openings ── */}
          <div className="couple-portrait couple-portrait--groom">
            <div className="couple-portrait-entrance couple-portrait-entrance--groom">
              <div className="couple-portrait-parallax">
                <div className="couple-portrait-scale">
                  {groomPhoto && (
                    <img
                      src={groomPhoto}
                      alt={groomDisplayName}
                      className="couple-portrait-img"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="couple-portrait couple-portrait--bride">
            <div className="couple-portrait-entrance couple-portrait-entrance--bride">
              <div className="couple-portrait-parallax">
                <div className="couple-portrait-scale">
                  {bridePhoto && (
                    <img
                      src={bridePhoto}
                      alt={brideDisplayName}
                      className="couple-portrait-img"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Floral corners stay frame-anchored while portrait cutouts parallax behind them. */}
          <div className="couple-flower-layer" aria-hidden="true">
            <div className="couple-flower-anchor couple-flower-anchor--groom">
              <img
                className="couple-flower couple-flower--left"
                src={flowerPhotoLeft}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
              <img
                className="couple-flower couple-flower--right"
                src={flowerPhotoRight}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="couple-flower-anchor couple-flower-anchor--bride">
              <img
                className="couple-flower couple-flower--left"
                src={flowerPhotoLeft}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
              <img
                className="couple-flower couple-flower--right"
                src={flowerPhotoRight}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* ── Groom Name & Role ── */}
        <div className="couple-card couple-card--groom">
          <h3 className="couple-name">{groomDisplayName}</h3>
          <p className="couple-role">THE GROOM</p>
          <div className="couple-family" aria-label="Groom's family and address">
            <p className="couple-family-parents">Son of Late Mrs. Lali Devi<br />&amp; Late Mr. Suresh Prasad</p>
            <p className="couple-family-address">Village: Khairetwa · P.O.: Tekuatar<br />P.S.: Ramkola<br />Kushinagar, Uttar Pradesh</p>
          </div>
        </div>

        {/* ── Bride Name & Role ── */}
        <div className="couple-card couple-card--bride">
          <h3 className="couple-name">{brideDisplayName}</h3>
          <p className="couple-role">THE BRIDE</p>
          <div className="couple-family" aria-label="Bride's family and address">
            <p className="couple-family-parents">Daughter of Mrs. Vidya Devi<br />&amp; Mr. Sitaram Prasad</p>
            <p className="couple-family-address">Village &amp; P.O.: Chhitauni (Bypass)<br />P.S.: Hanumanganj<br />Kushinagar, Uttar Pradesh</p>
          </div>
        </div>

        {/* ── Lower Divider / Lotus ── */}
        <div className="couple-divider-wrap" aria-hidden="true">
          <RoyalDivider size="sm" className="couple-divider couple-divider--bottom" />
        </div>

        {/* ── Bottom Tagline (above palace/lake) ── */}
        <p className="couple-tagline">
          Better Together
        </p>
      </div>
    </section>
  )
}

