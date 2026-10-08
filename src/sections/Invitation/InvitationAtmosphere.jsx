import { useEffect, useRef } from 'react'
import './InvitationAtmosphere.css'

/* ── Petal config ────────────────────────────────────────────────────
   7 petals on side lanes only – never covering the central text column.
   Durations 6–10s with staggered starts.
   Items marked `fg: true` receive blur(1.5px) for foreground depth.   */
const petals = [
  // Left side petals (1 foreground with blur, 3 background)
  { x: '4%',  size: 13, duration: 7.2, delay: -2.4, drift: 22,  rotation: 65,  fg: false },
  { x: '9%',  size: 19, duration: 6.6, delay: -4.8, drift: -26, rotation: -75, fg: true },
  { x: '6%',  size: 11, duration: 8.4, delay: -1.2, drift: 18,  rotation: 88,  fg: false },
  { x: '13%', size: 14, duration: 9.2, delay: -6.5, drift: -18, rotation: -45, fg: false },
  // Right side petals (1 foreground with blur, 2 background)
  { x: '89%', size: 18, duration: 7.6, delay: -3.6, drift: 24,  rotation: -80, fg: true },
  { x: '95%', size: 12, duration: 8.1, delay: -4.2, drift: -20, rotation: 72,  fg: false },
  { x: '91%', size: 15, duration: 9.6, delay: -7.0, drift: 16,  rotation: -62, fg: false },
]

/* ── Gold dust particles ─────────────────────────────────────────────
   12 particles – concentrated around floral edges, middle atmosphere flanks,
   and palace area without covering the text column.                    */
const particles = [
  // Left floral edge
  { x: 5,  y: 16, glow: false },
  { x: 9,  y: 34, glow: true },
  { x: 6,  y: 52, glow: false },
  { x: 13, y: 68, glow: true },
  { x: 4,  y: 82, glow: false },
  // Right floral edge
  { x: 95, y: 16, glow: false },
  { x: 90, y: 32, glow: true },
  { x: 93, y: 50, glow: false },
  { x: 88, y: 66, glow: true },
  { x: 96, y: 80, glow: false },
  // Palace lower / reflection area
  { x: 28, y: 86, glow: true },
  { x: 72, y: 88, glow: false },
]

export default function InvitationAtmosphere() {
  const surfaceRef = useRef(null)

  useEffect(() => {
    const root = surfaceRef.current?.closest('.invitation-section')
    if (!root) return undefined

    let inView = false
    const updateVisibility = () => {
      root.classList.toggle('invitation-atmosphere--visible', inView && !document.hidden)
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      updateVisibility()
    })

    observer.observe(root)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateVisibility)
      root.classList.remove('invitation-atmosphere--visible')
    }
  }, [])

  return (
    <div ref={surfaceRef} className="invitation-atmosphere" aria-hidden="true">
      {/* ── Lantern glow overlays ──────────────────────────────── */}
      <div className="invitation-lantern-plane">
        <span className="invitation-lantern-glow invitation-lantern-glow--left" />
        <span className="invitation-lantern-glow invitation-lantern-glow--right" />
        <span className="invitation-lantern-glow invitation-lantern-glow--lower" />
      </div>

      {/* ── Warm light breathing blooms ────────────────────────── */}
      <div className="invitation-light-blooms">
        <span className="invitation-bloom invitation-bloom--top" />
        <span className="invitation-bloom invitation-bloom--center" />
        <span className="invitation-bloom invitation-bloom--bottom" />
      </div>

      {/* ── Drifting petals ────────────────────────────────────── */}
      <div className="invitation-petals">
        {petals.map((petal, index) => (
          <span
            key={index}
            className={`invitation-petal${petal.fg ? ' invitation-petal--fg' : ''}`}
            style={{
              '--petal-x': petal.x,
              '--petal-size': `${petal.size}px`,
              '--petal-duration': `${petal.duration}s`,
              '--petal-delay': `${petal.delay}s`,
              '--petal-drift': `${petal.drift}px`,
              '--petal-rotation': `${petal.rotation}deg`,
            }}
          />
        ))}
      </div>

      {/* ── Gold atmospheric dust ──────────────────────────────── */}
      <div className="invitation-dust">
        {particles.map((p, index) => (
          <span
            key={index}
            className={`invitation-dust-particle${p.glow ? ' invitation-dust-particle--glow' : ''}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              '--dust-size': `${1.5 + (index % 3)}px`,
              '--dust-duration': `${13 + index % 5 * 2.5}s`,
              '--dust-delay': `${-index * 2.1}s`,
            }}
          />
        ))}
      </div>

      {/* ── Palace / diya reflection shimmer ───────────────────── */}
      <span className="invitation-reflection-shimmer" />
    </div>
  )
}
