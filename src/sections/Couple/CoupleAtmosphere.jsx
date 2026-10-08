import { useEffect, useRef } from 'react'
import './CoupleAtmosphere.css'

/* ── 7 Floating petals (kept strictly away from portrait slots and names) ──
   Safe lanes: far left border, central gutter between the two arches, and far right edge.
   2 foreground petals marked `fg: true` receive blur for depth.            */
const petals = [
  // Left floral lane (1 blurred foreground, 1 standard)
  { x: '4%',  size: 13, duration: 9.5,  delay: -2.0, drift: 10,  rotation: 65,  fg: false },
  { x: '6%',  size: 18, duration: 8.5,  delay: -4.5, drift: -8,  rotation: -75, fg: true  },
  // Center arch & pillar gutter (slowly drifting between the two portraits)
  { x: '49%', size: 12, duration: 11.0, delay: -1.5, drift: 6,   rotation: 45,  fg: false },
  { x: '51%', size: 15, duration: 10.0, delay: -6.2, drift: -6,  rotation: -50, fg: false },
  // Far right floral lane (1 blurred foreground, 2 standard)
  { x: '94%', size: 19, duration: 8.8,  delay: -3.0, drift: -10, rotation: -80, fg: true  },
  { x: '96%', size: 12, duration: 10.2, delay: -5.5, drift: 8,   rotation: 70,  fg: false },
  { x: '95%', size: 14, duration: 12.0, delay: -7.8, drift: -7,  rotation: 55,  fg: false },
]

/* ── 10 Golden atmospheric dust particles ──────────────────────────────
   1–3px, low opacity, slow upward motion around floral edges & upper atmosphere. */
const particles = [
  // Upper arch atmosphere
  { x: '48%', y: '14%', size: 2,   duration: 6.2, delay: -1.8 },
  { x: '52%', y: '18%', size: 1.5, duration: 5.5, delay: -3.2 },
  { x: '32%', y: '11%', size: 2.5, duration: 6.8, delay: -0.9 },
  { x: '68%', y: '12%', size: 2,   duration: 5.8, delay: -2.5 },
  // Left floral border
  { x: '5%',  y: '22%', size: 2,   duration: 5.2, delay: -1.2 },
  { x: '6%',  y: '48%', size: 1.5, duration: 6.0, delay: -3.6 },
  { x: '4%',  y: '74%', size: 2.5, duration: 5.6, delay: -2.1 },
  // Right floral border
  { x: '94%', y: '20%', size: 2,   duration: 5.0, delay: -2.4 },
  { x: '95%', y: '50%', size: 3,   duration: 6.4, delay: -4.0 },
  { x: '93%', y: '76%', size: 1.5, duration: 5.4, delay: -1.5 },
]

export default function CoupleAtmosphere() {
  const surfaceRef = useRef(null)

  useEffect(() => {
    const root = surfaceRef.current?.closest('.couple-section')
    if (!root) return undefined

    let inView = false
    const updateVisibility = () => {
      root.classList.toggle('couple-atmosphere--visible', inView && !document.hidden)
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
      root.classList.remove('couple-atmosphere--visible')
    }
  }, [])

  return (
    <div ref={surfaceRef} className="couple-atmosphere" aria-hidden="true">
      {/* ── Lantern Glow Overlays ── */}
      <div className="couple-lantern-glows">
        <span className="couple-lantern-glow couple-lantern-glow--left" />
        <span className="couple-lantern-glow couple-lantern-glow--right" />
      </div>

      {/* ── Portrait-Area Warmth (Subtle ambient light) ── */}
      <span className="couple-glow-portrait couple-glow-portrait--groom" />
      <span className="couple-glow-portrait--bride couple-glow-portrait" />

      {/* ── Palace & Lake Shimmer ── */}
      <div className="couple-water-shimmer">
        <span className="couple-water-reflection" />
      </div>

      {/* ── Floating Petals ── */}
      <div className="couple-petals">
        {petals.map((petal, index) => (
          <span
            key={index}
            className={`couple-petal${petal.fg ? ' couple-petal--fg' : ''}`}
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
      <div className="couple-dust">
        {particles.map((p, index) => (
          <span
            key={index}
            className="couple-dust-particle"
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

      {/* ── "Better Together" Gold Bloom Accent (Targeted by entrance timeline) ── */}
      <span className="couple-tagline-bloom" />
    </div>
  )
}
