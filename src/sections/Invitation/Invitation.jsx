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
      const celebrate = root.querySelector('.invitation-celebrate')
      const tagline = root.querySelector('.invitation-tagline')
      const revealElements = [quote, quoteDivider, title, body, lotus, celebrate, tagline]

      timeline = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
        onComplete: () => root.classList.add('invitation-atmosphere--live'),
      })

      if (reducedMotion) {
        gsap.set(revealElements, { opacity: 0 })
        timeline
          .to(quote, { opacity: 1, duration: .45 }, .05)
          .to(quoteDivider, { opacity: 1, duration: .35 }, .19)
          .to(title, { opacity: 1, duration: .6 }, .33)
          .to(body, { opacity: 1, duration: .45 }, .47)
          .to(lotus, { opacity: .7, duration: .35 }, .61)
          .to(celebrate, { opacity: 1, duration: .4 }, .75)
          .to(tagline, { opacity: 1, duration: .45 }, .89)
      } else {
        /* ── Initial hidden states ─────────────────────────────── */
        gsap.set(background, { scale: 1.03, transformOrigin: 'center center' })
        gsap.set([quote, body, celebrate, tagline], { opacity: 0, y: 18, filter: 'blur(4px)' })
        gsap.set(lotus, { opacity: 0, y: 14, scale: .9 })
        gsap.set(quoteDivider, {
          opacity: 0,
          scaleX: 0,
          transformOrigin: 'center center',
        })
        /* Main title: clearly visible initial hidden state */
        gsap.set(title, { opacity: 0, y: 28, scale: .94, filter: 'blur(7px)' })

        /* ── Reveal sequence (stagger ~0.14s) ───────────────────
           1. quote → 2. divider → 3. “You’re Invited” → 4. body paragraph
           → 5. lotus → 6. COME CELEBRATE → 7. subtitle */
        timeline
          .to(background, { scale: 1, duration: 1.2, ease: 'power2.out' }, 0)
          /* 1. Quote */
          .to(quote, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .58 }, .08)
          /* 2. Quote divider */
          .to(quoteDivider, { opacity: 1, scaleX: 1, duration: .45 }, .22)
          /* 3. “You’re Invited” – dominant cinematic entrance */
          .to(title, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: .85,
            ease: 'power3.out',
          }, .36)
          /* 4. Body paragraph */
          .to(body, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .58 }, .50)
          /* 5. Lotus ornament */
          .to(lotus, { opacity: .7, y: 0, scale: 1, duration: .42, ease: 'power2.out' }, .64)
          /* 6. COME CELEBRATE */
          .to(celebrate, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .52 }, .78)
          /* 7. Subtitle */
          .to(tagline, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .52 }, .92)
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

          <div className="invitation-closing">
            <p className="invitation-celebrate">COME CELEBRATE</p>
            <p className="invitation-tagline">LOVE, FAMILY AND NEW BEGINNINGS</p>
          </div>
        </div>
      </div>
    </section>
  )
}
