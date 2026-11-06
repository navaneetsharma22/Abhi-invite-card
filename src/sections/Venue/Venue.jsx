import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Map, Navigation } from 'lucide-react'
import { weddingData } from '../../data/weddingData'
import RoyalDivider from '../../components/ui/RoyalDivider'
import Button from '../../components/ui/Button'
import VenueAtmosphere from './VenueAtmosphere'
import './Venue.css'

export default function Venue() {
  const rootRef = useRef(null)
  const hasEnteredRef = useRef(false)

  const venueName = weddingData.venue?.name || weddingData.wedding.venue
  const weddingDate = (weddingData.wedding?.date || '21 November 2026').toUpperCase()
  const venueLandmark = weddingData.venue?.landmark || 'Near Railway Station'
  const venueAddress = weddingData.venue?.address || weddingData.wedding?.location || ''
  const venueAddressLines = venueAddress
    .split(',')
    .map((line) => line.trim())
    .filter((line) => line && line.toLocaleLowerCase() !== venueLandmark.toLocaleLowerCase())
  const venuePhoto = weddingData.venue?.photo ?? null
  const mapUrl = weddingData.venue?.mapUrl || weddingData.wedding?.mapUrl
  const directionsUrl = weddingData.venue?.directionsUrl || weddingData.wedding?.directionsUrl

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let observer
    let timeline
    let breathingTween

    const context = gsap.context(() => {
      const title = root.querySelector('.venue-title')
      const subtitle = root.querySelector('.venue-subtitle')
      const topDivider = root.querySelector('.venue-divider--top')
      const photoContainer = root.querySelector('.venue-photo-container')
      const eventLabel = root.querySelector('.venue-event-label')
      const dateEl = root.querySelector('.venue-date')
      const middleDivider = root.querySelector('.venue-divider--middle')
      const venueNameEl = root.querySelector('.venue-name')
      const addressEl = root.querySelector('.venue-address')
      const landmarkEl = root.querySelector('.venue-landmark')
      const actionsEl = root.querySelector('.venue-actions')
      const closingEl = root.querySelector('.venue-closing')
      const bottomDivider = root.querySelector('.venue-divider--bottom')
      const nameBloom = root.querySelector('.venue-name-bloom')
      const backgroundPush = root.querySelector('.venue-background-push')

      const revealElements = [
        title,
        subtitle,
        topDivider,
        photoContainer,
        eventLabel,
        dateEl,
        middleDivider,
        venueNameEl,
        addressEl,
        landmarkEl,
        actionsEl,
        closingEl,
        bottomDivider,
      ].filter(Boolean)

      // StrictMode safe: If already entered on remount, maintain revealed state
      if (hasEnteredRef.current) {
        gsap.set(revealElements, { opacity: 1, y: 0, scale: 1, filter: 'none' })
        if (nameBloom) gsap.set(nameBloom, { opacity: 0.04, scale: 1 })
        if (backgroundPush && !reducedMotion) {
          breathingTween = gsap.to(backgroundPush, {
            scale: 1.022,
            y: -2,
            duration: 17,
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
          .to(title, { opacity: 1, duration: 0.35 }, 0.05)
          .to(subtitle, { opacity: 1, duration: 0.30 }, 0.15)
          .to(topDivider, { opacity: 1, duration: 0.30 }, 0.25)
          .to(photoContainer, { opacity: 1, duration: 0.35 }, 0.35)
          .to(eventLabel, { opacity: 1, duration: 0.30 }, 0.45)
          .to(dateEl, { opacity: 1, duration: 0.30 }, 0.55)
          .to(middleDivider, { opacity: 1, duration: 0.30 }, 0.65)
          .to(venueNameEl, { opacity: 1, duration: 0.30 }, 0.75)
          .to(addressEl, { opacity: 1, duration: 0.30 }, 0.85)
          .to(landmarkEl, { opacity: 1, duration: 0.30 }, 0.95)
          .to(actionsEl, { opacity: 1, duration: 0.30 }, 1.05)
          .to(closingEl, { opacity: 1, duration: 0.30 }, 1.15)
          .to(bottomDivider, { opacity: 1, duration: 0.30 }, 1.25)
      } else {
        /* Initial hidden states */
        gsap.set(title, {
          opacity: 0,
          y: 24,
          scale: 0.96,
          filter: 'blur(5px)',
        })
        gsap.set([subtitle, topDivider], {
          opacity: 0,
          y: 10,
        })
        gsap.set(photoContainer, {
          opacity: 0,
          scale: 0.97,
          y: 18,
        })
        gsap.set([eventLabel, dateEl], {
          opacity: 0,
          y: 10,
        })
        gsap.set(middleDivider, {
          opacity: 0,
          y: 8,
          scale: 0.96,
        })
        gsap.set(venueNameEl, {
          opacity: 0,
          y: 14,
          filter: 'blur(3px)',
        })
        gsap.set(addressEl, {
          opacity: 0,
          y: 10,
        })
        gsap.set(landmarkEl, {
          opacity: 0,
          y: 10,
        })
        gsap.set(actionsEl, {
          opacity: 0,
          y: 10,
        })
        gsap.set(closingEl, {
          opacity: 0,
          y: 10,
        })
        gsap.set(bottomDivider, {
          opacity: 0,
          y: 8,
          scale: 0.96,
        })
        if (nameBloom) {
          gsap.set(nameBloom, {
            opacity: 0,
            scale: 0.88,
          })
        }

        /* 1. “The Venue” */
        timeline.to(title, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: 'power3.out',
        }, 0.05)

        /* 2. Subtitle */
        timeline.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.45,
        }, 0.28)

        /* Top Divider */
        timeline.to(topDivider, {
          opacity: 1,
          y: 0,
          duration: 0.45,
        }, 0.42)

        /* 3. Venue visual */
        timeline.to(photoContainer, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.65,
        }, 0.60)

        /* 4. “THE WEDDING DAY” */
        timeline.to(eventLabel, {
          opacity: 1,
          y: 0,
          duration: 0.42,
        }, 0.85)

        /* 5. Date */
        timeline.to(dateEl, {
          opacity: 1,
          y: 0,
          duration: 0.42,
        }, 1.00)

        /* 6. Divider */
        timeline.to(middleDivider, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
        }, 1.15)

        /* 7. Venue name */
        timeline.to(venueNameEl, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.50,
        }, 1.30)

        /* 8. Address */
        timeline.to(addressEl, {
          opacity: 1,
          y: 0,
          duration: 0.45,
        }, 1.50)

        /* 9. Landmark */
        timeline.to(landmarkEl, {
          opacity: 1,
          y: 0,
          duration: 0.45,
        }, 1.70)

        /* 10. Map and directions actions */
        timeline.to(actionsEl, {
          opacity: 1,
          y: 0,
          duration: 0.45,
        }, 1.84)

        /* 11. Closing line */
        timeline.to(closingEl, {
          opacity: 1,
          y: 0,
          duration: 0.50,
        }, 2.02)

        /* Bottom Divider before diya scenery */
        timeline.to(bottomDivider, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
        }, 2.18)

        /* Optional one-time subtle gold bloom behind venue-name area */
        if (nameBloom) {
          timeline
            .to(nameBloom, {
              opacity: 0.20,
              scale: 1.06,
              duration: 0.65,
              ease: 'power2.out',
            }, 1.35)
            .to(nameBloom, {
              opacity: 0.04,
              scale: 1.0,
              duration: 0.75,
              ease: 'power2.inOut',
            }, 2.10)
        }

        /* ── Slow background camera breathing ── */
        if (backgroundPush) {
          breathingTween = gsap.to(backgroundPush, {
            scale: 1.022,
            y: -2,
            duration: 17,
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

    return () => {
      observer?.disconnect()
      context.revert()
    }
  }, [])

  return (
    <section
      id="venue"
      ref={rootRef}
      className="venue-section"
      aria-labelledby="venue-title"
    >
      <div className="venue-stage">
        {/* Background breathing push wrapper */}
        <div className="venue-background-push" aria-hidden="true">
          <img
            className="venue-bg"
            src="/images/venue/venue-bg.webp.png"
            alt=""
            aria-hidden="true"
            width="941"
            height="1672"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Live Atmosphere Effects */}
        <VenueAtmosphere />

        {/* Minimal top transition feather from Couple section */}
        <div className="venue-transition" aria-hidden="true" />

        {/* ── Main Header ── */}
        <header className="venue-header">
          <h2 id="venue-title" className="venue-title">
            The Venue
          </h2>
          <p className="venue-subtitle">
            LET’S CELEBRATE TOGETHER
          </p>
          <RoyalDivider size="sm" className="venue-divider venue-divider--top" />
        </header>

        {/* ── Large Venue Photo Container (Prepared slot; empty until real photo is provided) ── */}
        <div className="venue-photo-container">
          {venuePhoto && (
            <img
              src={venuePhoto}
              alt={venueName}
              className="venue-photo"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        {/* ── Venue Details (Premium cream information composition) ── */}
        <div className="venue-details">
          {/* 1. Small uppercase label */}
          <span className="venue-event-label">THE WEDDING DAY</span>

          {/* 2. Wedding date */}
          <p className="venue-date">{weddingDate}</p>

          {/* 3. Elegant gold divider / lotus ornament */}
          <RoyalDivider size="sm" className="venue-divider venue-divider--middle" />

          {/* 4. Venue name (with subtle warm bloom accent) */}
          <div className="venue-name-wrap">
            <span className="venue-name-bloom" aria-hidden="true" />
            <h3 className="venue-name">{venueName}</h3>
          </div>

          {/* 5. Address */}
          <div className="venue-address">
            {venueAddressLines.map((line) => (
              <span className="venue-address-line" key={line}>{line}</span>
            ))}
          </div>

          {/* 6. Small landmark treatment */}
          <div className="venue-landmark">
            <span className="venue-landmark-label">LANDMARK</span>
            <span className="venue-landmark-value">{venueLandmark}</span>
          </div>

          {/* Map and directions links */}
          <div className="venue-actions">
            <Button
              variant="primary"
              className="venue-btn venue-btn--map"
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Map size={15} className="venue-btn-icon" aria-hidden="true" />
              <span>VIEW MAP</span>
            </Button>

            <Button
              variant="dark-gold"
              className="venue-btn venue-btn--directions"
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation size={15} className="venue-btn-icon" aria-hidden="true" />
              <span>GET DIRECTIONS</span>
            </Button>
          </div>

          {/* 7. Refined closing line */}
          <p className="venue-closing">
            “We look forward to celebrating this beautiful beginning with you.”
          </p>

          {/* 8. Small gold lotus/divider before lower diya scenery */}
          <RoyalDivider size="sm" className="venue-divider venue-divider--bottom" />
        </div>
      </div>
    </section>
  )
}
