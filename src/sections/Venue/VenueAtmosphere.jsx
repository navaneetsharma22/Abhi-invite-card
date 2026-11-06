import { useEffect, useRef } from 'react'
import './VenueAtmosphere.css'

/* ── 7 Floating petals (kept strictly away from title, venue details, and buttons) ──
   Safe lanes: outer left and right floral borders with gentle sideways drifts.
   2 foreground petals marked `fg: true` receive soft blur for atmospheric depth.  */
const petals = [
  // Left outer floral lane (1 blurred foreground, 2 standard)
  { x: '4%',  size: 13, duration: 9.2,  delay: -2.0, drift: 10,  rotation: 65,  fg: false },
  { x: '6%',  size: 19, duration: 8.4,  delay: -4.5, drift: -8,  rotation: -75, fg: true  },
  { x: '8%',  size: 12, duration: 11.0, delay: -1.2, drift: 8,   rotation: 50,  fg: false },
  // Far right outer floral lane (1 blurred foreground, 2 standard)
  { x: '94%', size: 18, duration: 8.8,  delay: -3.2, drift: -10, rotation: -80, fg: true  },
  { x: '96%', size: 12, duration: 10.0, delay: -5.6, drift: 8,   rotation: 70,  fg: false },
  { x: '92%', size: 14, duration: 11.5, delay: -7.2, drift: -8,  rotation: 45,  fg: false },
  // Subtle top-left drifting petal
  { x: '5%',  size: 15, duration: 10.5, delay: -6.0, drift: 6,   rotation: -55, fg: false },
]

/* ── 10 Golden atmospheric dust particles ──────────────────────────────
   1–3px, low opacity, slow upward motion around floral arch and venue atmosphere. */
const particles = [
  // Upper arch atmosphere
  { x: '48%', y: '14%', size: 2,   duration: 6.0, delay: -1.6 },
  { x: '52%', y: '18%', size: 1.5, duration: 5.4, delay: -3.0 },
  { x: '30%', y: '12%', size: 2.5, duration: 6.6, delay: -0.8 },
  { x: '70%', y: '13%', size: 2,   duration: 5.6, delay: -2.4 },
  // Left floral border & palace atmosphere
  { x: '6%',  y: '24%', size: 2,   duration: 5.2, delay: -1.4 },
  { x: '7%',  y: '48%', size: 1.5, duration: 6.2, delay: -3.8 },
  { x: '5%',  y: '72%', size: 2.5, duration: 5.8, delay: -2.0 },
  // Right floral border & palace atmosphere
  { x: '93%', y: '22%', size: 2,   duration: 5.0, delay: -2.2 },
  { x: '94%', y: '46%', size: 3,   duration: 6.4, delay: -4.2 },
  { x: '92%', y: '74%', size: 1.5, duration: 5.5, delay: -1.8 },
]

export default function VenueAtmosphere() {
  const surfaceRef = useRef(null)

  useEffect(() => {
    const root = surfaceRef.current?.closest('.venue-section')
    if (!root) return undefined

    let inView = false
    const updateVisibility = () => {
      root.classList.toggle('venue-atmosphere--visible', inView && !document.hidden)
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
      root.classList.remove('venue-atmosphere--visible')
    }
  }, [])

  return (
    <div ref={surfaceRef} className="venue-atmosphere" aria-hidden="true">
      {/* ── Lantern & Warm Light Radial Glows ── */}
      <div className="venue-lantern-glows">
        <span className="venue-lantern-glow venue-lantern-glow--top-left" />
        <span className="venue-lantern-glow venue-lantern-glow--top-right" />
        <span className="venue-lantern-glow venue-lantern-glow--pool-left" />
        <span className="venue-lantern-glow venue-lantern-glow--pool-right" />
      </div>

      {/* ── Photo-Area Ambient Light ── */}
      <span className="venue-glow-photo" />

      {/* ── Lower Reflection / Diya Shimmer ── */}
      <div className="venue-water-shimmer">
        <span className="venue-water-reflection" />
      </div>

      {/* ── Floating Petals ── */}
      <div className="venue-petals">
        {petals.map((petal, index) => (
          <span
            key={index}
            className={`venue-petal${petal.fg ? ' venue-petal--fg' : ''}`}
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

      {/* ── Golden Atmospheric Dust ── */}
      <div className="venue-dust">
        {particles.map((p, index) => (
          <span
            key={index}
            className="venue-dust-particle"
            style={{
              '--dust-x': p.x,
              '--dust-y': p.y,
              '--dust-size': `${p.size}px`,
              '--dust-duration': `${p.duration}s`,
              '--dust-delay': `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
