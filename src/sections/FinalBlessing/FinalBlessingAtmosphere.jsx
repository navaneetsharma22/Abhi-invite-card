import { useEffect, useRef } from 'react'
import './FinalBlessingAtmosphere.css'

/* ── 9 Golden / Star dust particles ───────────────────────────────────
   1–2.5px, low opacity, slow drifting motion in upper night sky & palace atmosphere. */
const starDust = [
  { x: '22%', y: '16%', size: 1.5, duration: 6.8, delay: -1.2 },
  { x: '78%', y: '18%', size: 2.0, duration: 7.4, delay: -3.5 },
  { x: '48%', y: '22%', size: 1.0, duration: 5.8, delay: -2.1 },
  { x: '15%', y: '32%', size: 2.2, duration: 7.2, delay: -0.8 },
  { x: '86%', y: '34%', size: 1.5, duration: 6.5, delay: -4.2 },
  { x: '35%', y: '44%', size: 2.0, duration: 8.0, delay: -2.8 },
  { x: '65%', y: '46%', size: 1.5, duration: 7.0, delay: -5.0 },
  { x: '25%', y: '52%', size: 2.5, duration: 6.2, delay: -1.6 },
  { x: '75%', y: '54%', size: 1.5, duration: 7.8, delay: -3.9 },
]

export default function FinalBlessingAtmosphere() {
  const containerRef = useRef(null)

  useEffect(() => {
    const root = containerRef.current?.closest('.final-blessing-section')
    if (!root) return undefined

    let inView = false
    const updateVisibility = () => {
      const active = inView && !document.hidden
      containerRef.current?.classList.toggle('final-atmosphere--active', active)
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      updateVisibility()
    }, { threshold: 0.15 })

    observer.observe(root)
    document.addEventListener('visibilitychange', updateVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  return (
    <div ref={containerRef} className="final-atmosphere" aria-hidden="true">
      {/* ── 1. Moonlight Radial Glow ── */}
      <span className="final-moon-glow" />

      {/* ── 2. Palace Warm Light Ambient Glows ── */}
      <div className="final-palace-glows">
        <span className="final-palace-glow final-palace-glow--left" />
        <span className="final-palace-glow final-palace-glow--center" />
        <span className="final-palace-glow final-palace-glow--right" />
      </div>

      {/* ── 3. Lake Water Reflection Shimmer ── */}
      <div className="final-water-shimmer">
        <span className="final-water-reflection" />
      </div>

      {/* ── 4. Foreground Diya Warmth Glows ── */}
      <div className="final-diya-glows">
        <span className="final-diya-glow final-diya-glow--left" />
        <span className="final-diya-glow final-diya-glow--center" />
        <span className="final-diya-glow final-diya-glow--right" />
      </div>

      {/* ── 5. Golden / Star Dust Particles ── */}
      <div className="final-dust">
        {starDust.map((p, index) => (
          <span
            key={index}
            className="final-dust-particle"
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
