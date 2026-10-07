import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import RoyalDivider from '../../components/ui/RoyalDivider'
import InvitationAtmosphere from './InvitationAtmosphere'
import './Invitation.css'

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
      const celebrationDivider = root.querySelector('.invitation-divider--celebration')
      const celebrate = root.querySelector('.invitation-celebrate')
      const tagline = root.querySelector('.invitation-tagline')
      const revealElements = [quote, quoteDivider, title, body, celebrationDivider, celebrate, tagline]

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
          .to(celebrationDivider, { opacity: 1, duration: .38 }, .94)
          .to(celebrate, { opacity: 1, duration: .4 }, 1.16)
          .to(tagline, { opacity: 1, duration: .45 }, 1.38)
      } else {
        gsap.set(background, { opacity: .88, scale: 1.03, transformOrigin: 'center center' })
        gsap.set([quote, body, celebrate, tagline], { opacity: 0, y: 16, filter: 'blur(4px)' })
        gsap.set([quoteDivider, celebrationDivider], {
          opacity: 0,
          scaleX: 0,
          transformOrigin: 'center center',
        })
        gsap.set(title, { opacity: 0, y: 20, scale: .97, filter: 'blur(4px)' })
        timeline
          .to(background, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0)
          .to(quote, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .52 }, .12)
          .to(quoteDivider, { opacity: 1, scaleX: 1, duration: .45 }, .32)
          .to(title, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: .75,
            ease: 'power3.out',
          }, .48)
          .to(body, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .55 }, .76)
          .to(celebrationDivider, { opacity: 1, scaleX: 1, duration: .45 }, .98)
          .to(celebrate, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .45 }, 1.2)
          .to(tagline, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .5 }, 1.42)
      }

      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting || hasEnteredRef.current) return
        hasEnteredRef.current = true
        observer.disconnect()
        timeline.play(0)
      }, { threshold: .08, rootMargin: '0px 0px -12% 0px' })

      observer.observe(root)
    }, root)

    return () => {
      observer?.disconnect()
      context.revert()
      root.classList.remove('invitation-atmosphere--live')
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

        <div className="invitation-content">
          <blockquote className="invitation-quote">
            <span>Some invitations are written on paper,</span>{' '}
            <span>but the most special ones are written</span>{' '}
            <span>in the heart.</span>
          </blockquote>

          <RoyalDivider size="sm" className="invitation-divider invitation-divider--quote" />

          <h2 id="invitation-title" className="invitation-title">
            <span>You’re</span>{' '}
            <span>Invited</span>
          </h2>

          <p className="invitation-body">
            <span>With joy in our hearts, we invite you to</span>{' '}
            <span>be a part of this beautiful chapter in our</span>{' '}
            <span>lives. Your presence will make our</span>{' '}
            <span>celebration truly special.</span>
          </p>

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
