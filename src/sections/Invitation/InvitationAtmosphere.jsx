import { useEffect, useRef } from 'react'
import './InvitationAtmosphere.css'

/* ── Petal config ────────────────────────────────────────────────────
   7 petals on side lanes only – never covering the central text column.
   Items marked `fg: true` get slight blur for foreground depth.          */
const petals = [
  { x: '4%',  size: 12, duration: 22, delay: -2,  drift: 6,  rotation: 58,  fg: false },
  { x: '9%',  size: 15, duration: 28, delay: -12, drift: -7, rotation: -78, fg: true },
  { x: '6%',  size: 10, duration: 24, delay: -8,  drift: 4,  rotation: 92,  fg: false },
  { x: '3%',  size: 8,  duration: 30, delay: -19, drift: 3,  rotation: -46, fg: false },
  { x: '92%', size: 14, duration: 25, delay: -5,  drift: 7,  rotation: -68, fg: false },
  { x: '96%', size: 11, duration: 21, delay: -14, drift: -5, rotation: 82,  fg: true },
  { x: '90%', size: 9,  duration: 27, delay: -22, drift: 4,  rotation: -95, fg: false },
]

/* ── Gold dust particles ─────────────────────────────────────────────
   12 particles – concentrated around side flowers and upper-middle.
   Items where glowing=true receive a brighter box-shadow.              */
const particles = [
  { x: 4,  y: 18, glow: false },
  { x: 9,  y: 35, glow: true },
  { x: 6,  y: 52, glow: false },
  { x: 12, y: 14, glow: false },
  { x: 14, y: 68, glow: true },
  { x: 3,  y: 82, glow: false },
  { x: 96, y: 16, glow: false },
  { x: 91, y: 32, glow: true },
  { x: 88, y: 48, glow: false },
  { x: 94, y: 62, glow: false },
  { x: 97, y: 78, glow: false },
  { x: 86, y: 26, glow: false },
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
