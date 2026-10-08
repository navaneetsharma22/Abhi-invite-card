import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import RoyalDivider from '../../components/ui/RoyalDivider'
import InvitationAtmosphere from './InvitationAtmosphere'
import './Invitation.css'

/* Elegant inline lotus ornament – no external dependency required. */
function LotusOrnament({ className = '' }) {
  return (
    <svg
      className={`invitation-lotus ${className}`.trim()}
      viewBox="0 0 64 48"
      fill="none"
      aria-hidden="true"
    >
      {/* centre petal */}
      <path
        d="M32 4 C28 18, 20 28, 32 44 C44 28, 36 18, 32 4Z"
        fill="currentColor"
        opacity=".22"
      />
      {/* left petals */}
      <path
        d="M32 44 C18 34, 8 26, 6 14 C10 22, 20 32, 32 44Z"
        fill="currentColor"
        opacity=".16"
      />
      <path
        d="M32 44 C22 38, 14 30, 14 18 C16 26, 24 36, 32 44Z"
        fill="currentColor"
        opacity=".20"
      />
      {/* right petals */}
      <path
        d="M32 44 C46 34, 56 26, 58 14 C54 22, 44 32, 32 44Z"
        fill="currentColor"
        opacity=".16"
      />
      <path
        d="M32 44 C42 38, 50 30, 50 18 C48 26, 40 36, 32 44Z"
        fill="currentColor"
        opacity=".20"
      />
    </svg>
  )
}

export default function Invitation() {
  const hasEnteredRef = useRef(false)

  useLayoutEffect(() => {
    const root = document.getElementById('invitation')
    if (!root) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let observer
    let timeline

    const context = gsap.context(() => {
      const background = root.querySelector('.invitation-background')
      const quote = root.querySelector('.invitation-quote')
      const quoteDivider = root.querySelector('.invitation-divider--quote')
      const title = root.querySelector('.invitation-title')
      const body = root.querySelector('.invitation-body')
      const lotus = root.querySelector('.invitation-lotus')
      const celebrationDivider = root.querySelector('.invitation-divider--celebration')
      const celebrate = root.querySelector('.invitation-celebrate')
      const tagline = root.querySelector('.invitation-tagline')
      const revealElements = [quote, quoteDivider, title, body, lotus, celebrationDivider, celebrate, tagline]

      timeline = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
        onComplete: () => root.classList.add('invitation-atmosphere--live'),
      })

      if (reducedMotion) {
        gsap.set(background, { opacity: .88 })
        gsap.set(revealElements, { opacity: 0 })
        timeline
          .to(background, { opacity: 1, duration: 1.2 }, 0)
          .to(quote, { opacity: 1, duration: .42 }, .12)
          .to(quoteDivider, { opacity: 1, duration: .38 }, .3)
          .to(title, { opacity: 1, duration: .55 }, .48)
          .to(body, { opacity: 1, duration: .45 }, .72)
          .to(lotus, { opacity: .7, duration: .38 }, .88)
          .to(celebrationDivider, { opacity: 1, duration: .38 }, .94)
          .to(celebrate, { opacity: 1, duration: .4 }, 1.16)
          .to(tagline, { opacity: 1, duration: .45 }, 1.38)
      } else {
        /* ── Initial hidden states ─────────────────────────────── */
        gsap.set(background, { opacity: .88, scale: 1.03, transformOrigin: 'center center' })
        gsap.set([quote, body, celebrate, tagline], { opacity: 0, y: 16, filter: 'blur(4px)' })
        gsap.set(lotus, { opacity: 0, y: 10, scale: .9 })
        gsap.set([quoteDivider, celebrationDivider], {
          opacity: 0,
          scaleX: 0,
          transformOrigin: 'center center',
        })
        /* Title starts with cinematic hidden state */
        gsap.set(title, { opacity: 0, y: 22, scale: .96, filter: 'blur(5px)' })

        /* ── Reveal order ──────────────────────────────────────
           quote → divider → You're Invited → body → lotus → COME CELEBRATE → subtitle */
        timeline
          .to(background, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0)
          /* 1. Quote */
          .to(quote, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .52 }, .14)
          /* 2. Quote divider */
          .to(quoteDivider, { opacity: 1, scaleX: 1, duration: .45 }, .38)
          /* 3. Title – cinematic reveal */
          .to(title, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: .75,
            ease: 'power3.out',
          }, .58)
          /* 4. Body */
          .to(body, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .55 }, .92)
          /* 5. Lotus ornament */
          .to(lotus, { opacity: .7, y: 0, scale: 1, duration: .4, ease: 'power2.out' }, 1.18)
          /* 6. COME CELEBRATE */
          .to(celebrate, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .45 }, 1.36)
          /* 7. Subtitle */
          .to(tagline, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .5 }, 1.56)
      }

      /* ── Intersection observer ─────────────────────────────────
         Trigger when ~35-45% of the section enters viewport.
         Using threshold .38 + rootMargin that avoids early firing
         while only the top edge is visible. */
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting || hasEnteredRef.current) return
        hasEnteredRef.current = true
        root.classList.add('invitation-transition--entered')
        observer.disconnect()
        timeline.play(0)
      }, { threshold: .38 })

      observer.observe(root)
    }, root)

    return () => {
      observer?.disconnect()
      context.revert()
      root.classList.remove('invitation-atmosphere--live', 'invitation-transition--entered')
    }
  }, [])

  return (
    <section id="invitation" className="invitation-section" aria-labelledby="invitation-title">
      <div className="invitation-stage">
        {/* Entrance owns the image transform; ambient push owns this wrapper. */}
        <div className="invitation-background-push" aria-hidden="true">
          <img
            className="invitation-background"
            src="/images/invitation/invitation-bg.webp.png"
            alt=""
            aria-hidden="true"
            width="941"
            height="1672"
            loading="lazy"
            decoding="async"
          />
        </div>
        <InvitationAtmosphere />
        <div className="invitation-transition" aria-hidden="true" />

        <div className="invitation-content">
          <blockquote className="invitation-quote">
            <span>Some invitations are written on paper,</span>{' '}
            <span>but the most special ones are written</span>{' '}
            <span>in the heart.</span>
          </blockquote>

          <RoyalDivider size="sm" className="invitation-divider invitation-divider--quote" />

          <h2 id="invitation-title" className="invitation-title">
            <span>You're</span>{' '}
            <span>Invited</span>
          </h2>

          <p className="invitation-body">
            <span>With joy in our hearts, we invite you to</span>{' '}
            <span>be a part of this beautiful chapter in our</span>{' '}
            <span>lives. Your presence will make our</span>{' '}
            <span>celebration truly special.</span>
          </p>

          <LotusOrnament />

          <RoyalDivider className="invitation-divider invitation-divider--celebration" />

          <div className="invitation-closing">
            <p className="invitation-celebrate">COME CELEBRATE</p>
            <p className="invitation-tagline">LOVE, FAMILY AND NEW BEGINNINGS</p>
          </div>
        </div>
      </div>
    </section>
  )
}
