import { useEffect, useRef, useState } from 'react'
import './FinalBlessingPetals.css'

/* ── 17 Active Falling Petals across 3 Depth Lanes ────────────────────
   Safe trajectories avoid central text box (x: 35-65%, y: 9-38%) and couple heads (x: 42-58%, y: 62-70%).
   Back lane (6): 10-13px, slower, soft blur.
   Mid lane (7): 14-17px, crisp, main visible drift.
   Front lane (4): 19-23px, foreground blur, slightly faster. */
const fallingPetals = [
  // ── BACK LANE (6 petals) ──
  { x: '7%',  size: 11, duration: 12.0, delay: 0.0,  drift: 14,  rotation: 65,  palette: 'rose',  lane: 'back', maxOpacity: 0.40 },
  { x: '15%', size: 13, duration: 13.2, delay: 1.8,  drift: -12, rotation: -70, palette: 'blush', lane: 'back', maxOpacity: 0.45 },
  { x: '26%', size: 10, duration: 11.5, delay: 3.5,  drift: 10,  rotation: 55,  palette: 'ivory', lane: 'back', maxOpacity: 0.35 },
  { x: '74%', size: 12, duration: 12.8, delay: 2.2,  drift: -10, rotation: -50, palette: 'gold',  lane: 'back', maxOpacity: 0.40 },
  { x: '84%', size: 11, duration: 13.5, delay: 0.8,  drift: 12,  rotation: 60,  palette: 'rose',  lane: 'back', maxOpacity: 0.42 },
  { x: '92%', size: 13, duration: 12.2, delay: 4.2,  drift: -15, rotation: -75, palette: 'blush', lane: 'back', maxOpacity: 0.45 },

  // ── MID LANE (7 petals) ──
  { x: '5%',  size: 15, duration: 9.6,  delay: 0.4,  drift: 18,  rotation: -80, palette: 'rose',  lane: 'mid',  maxOpacity: 0.75 },
  { x: '12%', size: 17, duration: 10.4, delay: 2.6,  drift: -16, rotation: 70,  palette: 'blush', lane: 'mid',  maxOpacity: 0.72 },
  { x: '24%', size: 14, duration: 9.0,  delay: 4.8,  drift: 14,  rotation: -65, palette: 'gold',  lane: 'mid',  maxOpacity: 0.70 },
  { x: '70%', size: 16, duration: 9.8,  delay: 1.2,  drift: -14, rotation: 60,  palette: 'ivory', lane: 'mid',  maxOpacity: 0.76 },
  { x: '78%', size: 15, duration: 10.2, delay: 3.8,  drift: 16,  rotation: -75, palette: 'rose',  lane: 'mid',  maxOpacity: 0.74 },
  { x: '88%', size: 14, duration: 8.8,  delay: 5.4,  drift: -18, rotation: 80,  palette: 'blush', lane: 'mid',  maxOpacity: 0.72 },
  { x: '95%', size: 16, duration: 10.6, delay: 2.0,  drift: 12,  rotation: -55, palette: 'gold',  lane: 'mid',  maxOpacity: 0.70 },

  // ── FRONT LANE (4 larger foreground petals) ──
  { x: '9%',  size: 21, duration: 7.8,  delay: 1.0,  drift: 22,  rotation: -85, palette: 'rose',  lane: 'front', maxOpacity: 0.82 },
  { x: '28%', size: 20, duration: 8.4,  delay: 4.0,  drift: -18, rotation: 75,  palette: 'blush', lane: 'front', maxOpacity: 0.80 },
  { x: '76%', size: 22, duration: 8.0,  delay: 2.8,  drift: 20,  rotation: -70, palette: 'ivory', lane: 'front', maxOpacity: 0.84 },
  { x: '91%', size: 20, duration: 7.5,  delay: 5.2,  drift: -22, rotation: 80,  palette: 'rose',  lane: 'front', maxOpacity: 0.80 },
]

/* ── 4 Sparse Ongoing Loop Petals (3–5 petals active at a time after initial wave) ── */
const ongoingPetals = [
  { x: '8%',  size: 15, duration: 11.2, delay: 10.5, drift: 16,  rotation: 65,  palette: 'rose',  lane: 'mid', maxOpacity: 0.68 },
  { x: '22%', size: 13, duration: 12.5, delay: 13.0, drift: -14, rotation: -60, palette: 'blush', lane: 'mid', maxOpacity: 0.65 },
  { x: '75%', size: 16, duration: 11.8, delay: 11.8, drift: 15,  rotation: 70,  palette: 'ivory', lane: 'mid', maxOpacity: 0.70 },
  { x: '90%', size: 14, duration: 13.0, delay: 14.5, drift: -16, rotation: -75, palette: 'gold',  lane: 'mid', maxOpacity: 0.66 },
]

/* ── 6 Initial Base Petals (settled from start to avoid empty floor) ── */
const initialPetals = [
  { x: '12%', bottom: '6.2%', size: 14, rotation: 35,  scale: 0.95, palette: 'rose',  opacity: 0.48 },
  { x: '18%', bottom: '9.0%', size: 16, rotation: -45, scale: 1.05, palette: 'blush', opacity: 0.45 },
  { x: '44%', bottom: '5.8%', size: 13, rotation: 60,  scale: 0.90, palette: 'ivory', opacity: 0.42 },
  { x: '56%', bottom: '7.2%', size: 15, rotation: -30, scale: 1.00, palette: 'gold',  opacity: 0.45 },
  { x: '82%', bottom: '8.5%', size: 16, rotation: 50,  scale: 1.05, palette: 'rose',  opacity: 0.48 },
  { x: '88%', bottom: '6.0%', size: 14, rotation: -60, scale: 0.92, palette: 'blush', opacity: 0.45 },
]

/* ── 28 Arriving Petals for the Settled Bed (capped: 6 + 28 = 34 total) ──
   Distributed naturally across left foreground (10), center carpet (8), right foreground (10).
   Target area: bottom 5% to 12.5% zone (bottom 6–13% of portrait stage).
   Never covering diya flames directly. */
const arrivingPetals = [
  // Left foreground terrace & brass urli zone (10 petals)
  { x: '8%',  bottom: '5.6%', size: 15, rotation: -40, scale: 1.02, palette: 'rose',  opacity: 0.72, settleDelay: 6.8 },
  { x: '11%', bottom: '10.2%',size: 13, rotation: 65,  scale: 0.88, palette: 'blush', opacity: 0.68, settleDelay: 8.2 },
  { x: '15%', bottom: '5.2%', size: 17, rotation: -25, scale: 1.10, palette: 'ivory', opacity: 0.75, settleDelay: 9.5 },
  { x: '17%', bottom: '7.8%', size: 14, rotation: 55,  scale: 0.95, palette: 'rose',  opacity: 0.70, settleDelay: 11.0 },
  { x: '20%', bottom: '5.8%', size: 16, rotation: -70, scale: 1.05, palette: 'gold',  opacity: 0.72, settleDelay: 12.4 },
  { x: '23%', bottom: '9.2%', size: 13, rotation: 30,  scale: 0.90, palette: 'blush', opacity: 0.66, settleDelay: 13.8 },
  { x: '9%',  bottom: '8.2%', size: 15, rotation: -50, scale: 1.00, palette: 'rose',  opacity: 0.74, settleDelay: 15.2 },
  { x: '15%', bottom: '11.8%',size: 14, rotation: 45,  scale: 0.92, palette: 'ivory', opacity: 0.68, settleDelay: 16.5 },
  { x: '21%', bottom: '6.8%', size: 16, rotation: -35, scale: 1.08, palette: 'rose',  opacity: 0.72, settleDelay: 18.0 },
  { x: '25%', bottom: '11.0%',size: 13, rotation: 60,  scale: 0.88, palette: 'blush', opacity: 0.65, settleDelay: 19.5 },

  // Center terrace carpet & lake reflection zone (8 petals)
  { x: '38%', bottom: '5.5%', size: 15, rotation: -55, scale: 1.00, palette: 'rose',  opacity: 0.70, settleDelay: 7.5 },
  { x: '42%', bottom: '8.8%', size: 13, rotation: 40,  scale: 0.90, palette: 'blush', opacity: 0.65, settleDelay: 9.0 },
  { x: '47%', bottom: '6.0%', size: 16, rotation: -20, scale: 1.05, palette: 'gold',  opacity: 0.74, settleDelay: 10.5 },
  { x: '52%', bottom: '9.8%', size: 14, rotation: 65,  scale: 0.95, palette: 'ivory', opacity: 0.68, settleDelay: 12.0 },
  { x: '58%', bottom: '5.2%', size: 17, rotation: -45, scale: 1.12, palette: 'rose',  opacity: 0.76, settleDelay: 13.5 },
  { x: '62%', bottom: '8.4%', size: 13, rotation: 50,  scale: 0.88, palette: 'blush', opacity: 0.66, settleDelay: 15.0 },
  { x: '45%', bottom: '12.2%',size: 15, rotation: -60, scale: 1.02, palette: 'gold',  opacity: 0.70, settleDelay: 17.2 },
  { x: '55%', bottom: '11.6%',size: 14, rotation: 35,  scale: 0.92, palette: 'rose',  opacity: 0.68, settleDelay: 19.0 },

  // Right foreground terrace & brass urli zone (10 petals)
  { x: '75%', bottom: '5.2%', size: 16, rotation: -30, scale: 1.06, palette: 'rose',  opacity: 0.74, settleDelay: 7.2 },
  { x: '78%', bottom: '9.2%', size: 13, rotation: 55,  scale: 0.90, palette: 'blush', opacity: 0.68, settleDelay: 8.6 },
  { x: '81%', bottom: '4.8%', size: 17, rotation: -65, scale: 1.10, palette: 'ivory', opacity: 0.75, settleDelay: 10.0 },
  { x: '84%', bottom: '8.0%', size: 14, rotation: 40,  scale: 0.95, palette: 'gold',  opacity: 0.70, settleDelay: 11.6 },
  { x: '87%', bottom: '5.5%', size: 16, rotation: -45, scale: 1.04, palette: 'rose',  opacity: 0.72, settleDelay: 13.0 },
  { x: '90%', bottom: '9.8%', size: 13, rotation: 70,  scale: 0.88, palette: 'blush', opacity: 0.66, settleDelay: 14.4 },
  { x: '93%', bottom: '6.2%', size: 15, rotation: -20, scale: 1.00, palette: 'rose',  opacity: 0.74, settleDelay: 16.0 },
  { x: '76%', bottom: '11.2%',size: 14, rotation: 50,  scale: 0.94, palette: 'ivory', opacity: 0.68, settleDelay: 17.5 },
  { x: '82%', bottom: '12.0%',size: 15, rotation: -55, scale: 1.02, palette: 'rose',  opacity: 0.72, settleDelay: 18.8 },
  { x: '89%', bottom: '12.2%',size: 13, rotation: 35,  scale: 0.90, palette: 'gold',  opacity: 0.66, settleDelay: 20.2 },
]

export default function FinalBlessingPetals({ active = false }) {
  const containerRef = useRef(null)
  const isReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [settledCount, setSettledCount] = useState(() => (isReducedMotion ? 5 : 0))

  useEffect(() => {
    if (isReducedMotion || !active) return undefined

    const timers = []
    arrivingPetals.forEach((petal, index) => {
      const timer = setTimeout(() => {
        setSettledCount(prev => Math.max(prev, index + 1))
      }, petal.settleDelay * 1000)
      timers.push(timer)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [active, isReducedMotion])

  useEffect(() => {
    const root = containerRef.current?.closest('.final-blessing-section')
    if (!root) return undefined

    let inView = false
    const updateVisibility = () => {
      const isVisible = inView && !document.hidden
      containerRef.current?.classList.toggle('final-petals-active', active && isVisible)
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
  }, [active])

  return (
    <div
      ref={containerRef}
      className={`final-petals-system${active ? ' final-petals-active' : ''}`}
      aria-hidden="true"
    >
      {/* ── 1. Falling Petals (17 active in 3 depth lanes) ── */}
      {!isReducedMotion && (
        <div className="final-falling-petals">
          {fallingPetals.map((p, index) => (
            <span
              key={`fall-${index}`}
              className={`final-petal final-petal--falling final-petal--${p.palette} final-petal--lane-${p.lane} falling-petal--${p.lane}`}
              style={{
                '--petal-x': p.x,
                '--petal-size': `${p.size}px`,
                '--petal-duration': `${p.duration}s`,
                '--petal-delay': `${p.delay}s`,
                '--petal-drift': `${p.drift}px`,
                '--petal-rotation': `${p.rotation}deg`,
                '--petal-max-opacity': p.maxOpacity,
                '--petal-wind-shift': `${((index % 5) - 2) * 4}px`,
              }}
            />
          ))}

          {/* Sparse Ongoing Loop Petals */}
          {ongoingPetals.map((p, index) => (
            <span
              key={`ongoing-${index}`}
              className={`final-petal final-petal--ongoing final-petal--${p.palette} final-petal--lane-${p.lane} falling-petal--${p.lane}`}
              style={{
                '--petal-x': p.x,
                '--petal-size': `${p.size}px`,
                '--petal-duration': `${p.duration}s`,
                '--petal-delay': `${p.delay}s`,
                '--petal-drift': `${p.drift}px`,
                '--petal-rotation': `${p.rotation}deg`,
                '--petal-max-opacity': p.maxOpacity,
                '--petal-wind-shift': `${((index % 5) - 2) * 4}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* ── 2. Settled Petal Bed (.final-petal-bed in bottom 6–13% zone) ── */}
      <div className="final-petal-bed">
        {/* Initial Static Base Petals (6 subtle petals) */}
        {initialPetals.map((p, index) => (
          <span
            key={`bed-init-${index}`}
            className={`final-settled-petal final-settled-petal--initial final-petal--${p.palette}`}
            style={{
              '--bed-x': p.x,
              '--bed-bottom': p.bottom,
              '--bed-size': `${p.size}px`,
              '--bed-rotation': `${p.rotation}deg`,
              '--bed-scale': p.scale,
              '--bed-opacity': p.opacity,
            }}
          />
        ))}

        {/* Arriving Petals Accumulation (capped at 28, bringing total to 34) */}
        {arrivingPetals.map((p, index) => {
          const isSettled = index < settledCount
          return (
            <span
              key={`bed-arrive-${index}`}
              className={`final-settled-petal final-petal--${p.palette}${isSettled ? ' final-settled-petal--settled' : ''}`}
              style={{
                '--bed-x': p.x,
                '--bed-bottom': p.bottom,
                '--bed-size': `${p.size}px`,
                '--bed-rotation': `${p.rotation}deg`,
                '--bed-scale': p.scale,
                '--bed-opacity': p.opacity,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
