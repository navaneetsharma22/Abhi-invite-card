import { useEffect, useRef } from 'react'
import './CelebrationsAtmosphere.css'

/* ── 7 Floating petals (kept away from the event text column) ────────
   Safe lanes: left floral border / photo frame column and far right edge.
   2 foreground petals marked `fg: true` receive blur for depth.        */
const petals = [
  // Left floral lane (1 foreground blurred, 3 background)
  { x: '4%',  size: 12, duration: 9.0,  delay: -2.0, drift: 22,  rotation: 65,  fg: false },
  { x: '8%',  size: 19, duration: 8.0,  delay: -4.5, drift: -20, rotation: -80, fg: true  },
  { x: '12%', size: 15, duration: 11.0, delay: -1.2, drift: 18,  rotation: 75,  fg: false },
  { x: '16%', size: 11, duration: 10.0, delay: -6.0, drift: -16, rotation: -45, fg: false },
  // Far right floral lane (1 foreground blurred, 2 background)
  { x: '94%', size: 18, duration: 8.5,  delay: -3.5, drift: 22,  rotation: -70, fg: true  },
  { x: '96%', size: 13, duration: 9.5,  delay: -5.0, drift: -18, rotation: 85,  fg: false },
  { x: '5%',  size: 14, duration: 12.0, delay: -7.5, drift: 15,  rotation: 50,  fg: false },
]

/* ── 12 Golden atmospheric dust particles ────────────────────────────
   1–3px, low opacity, slow upward motion around borders & atmosphere.  */
const particles = [
  // Left floral border
  { x: '6%',  y: '14%', size: 2,   duration: 5.2, delay: -1.4 },
  { x: '10%', y: '28%', size: 3,   duration: 6.0, delay: -3.8 },
  { x: '7%',  y: '45%', size: 1.5, duration: 4.8, delay: -0.6 },
  { x: '14%', y: '62%', size: 2,   duration: 5.6, delay: -2.7 },
  { x: '5%',  y: '78%', size: 2.5, duration: 6.4, delay: -4.1 },
  // Far right floral border
  { x: '92%', y: '15%', size: 2,   duration: 5.0, delay: -2.1 },
  { x: '95%', y: '30%', size: 1.5, duration: 5.8, delay: -0.9 },
  { x: '88%', y: '48%', size: 3,   duration: 6.2, delay: -3.4 },
  { x: '94%', y: '65%', size: 2,   duration: 4.9, delay: -1.7 },
  { x: '90%', y: '80%', size: 2.5, duration: 5.5, delay: -4.5 },
  // Center arch & atmosphere
  { x: '48%', y: '16%', size: 2,   duration: 6.8, delay: -2.2 },
  { x: '52%', y: '21%', size: 1.5, duration: 5.4, delay: -3.1 },
]

export default function CelebrationsAtmosphere() {
  const surfaceRef = useRef(null)

  useEffect(() => {
    const root = surfaceRef.current?.closest('.celebrations-section')
    if (!root) return undefined

    let inView = false
    const updateVisibility = () => {
      root.classList.toggle('celebrations-atmosphere--visible', inView && !document.hidden)
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
      root.classList.remove('celebrations-atmosphere--visible')
    }
  }, [])

  return (
    <div ref={surfaceRef} className="celebrations-atmosphere" aria-hidden="true">
      {/* ── Lantern Glow Overlays ── */}
      <div className="celebration-lantern-glows">
        <span className="celebration-lantern-glow celebration-lantern-glow--left" />
        <span className="celebration-lantern-glow celebration-lantern-glow--right" />
      </div>

      {/* ── Haldi Area Warmth ── */}
      <span className="celebration-glow-haldi" />

      {/* ── Wedding Area Warmth ── */}
      <span className="celebration-glow-wedding" />

      {/* ── Palace & Water Shimmer ── */}
      <div className="celebration-water-shimmer">
        <span className="celebration-water-reflection" />
      </div>

      {/* ── Floating Petals ── */}
      <div className="celebration-petals">
        {petals.map((petal, index) => (
          <span
            key={index}
            className={`celebration-petal${petal.fg ? ' celebration-petal--fg' : ''}`}
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

      {/* ── Golden Dust ── */}
      <div className="celebration-dust">
        {particles.map((p, index) => (
          <span
            key={index}
            className="celebration-dust-particle"
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
