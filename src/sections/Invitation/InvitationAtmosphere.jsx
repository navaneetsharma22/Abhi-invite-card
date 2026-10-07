import { useEffect, useRef } from 'react'
import './InvitationAtmosphere.css'

// Side-only lanes keep every drifting element outside the central text column.
const petals = [
  { x: '4%', size: 9, duration: 23, delay: -4, drift: 4, rotation: 62 },
  { x: '8%', size: 12, duration: 28, delay: -18, drift: -5, rotation: -74 },
  { x: '5.5%', size: 8, duration: 25, delay: -11, drift: 3, rotation: 88 },
  { x: '92%', size: 10, duration: 27, delay: -7, drift: 5, rotation: -65 },
  { x: '96%', size: 8, duration: 22, delay: -16, drift: -4, rotation: 78 },
  { x: '93.5%', size: 11, duration: 30, delay: -24, drift: 3, rotation: -92 },
]

const particles = [
  [5, 24], [10, 38], [7, 52], [11, 69], [4, 84], [9, 94],
  [95, 22], [90, 36], [93, 49], [89, 65], [96, 81], [91, 92],
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
      {/* Match the image's cover crop so glows stay over its baked-in lanterns. */}
      <div className="invitation-lantern-plane">
        <span className="invitation-lantern-glow invitation-lantern-glow--left" />
        <span className="invitation-lantern-glow invitation-lantern-glow--right" />
        <span className="invitation-lantern-glow invitation-lantern-glow--lower" />
      </div>
      <div className="invitation-petals">
        {petals.map((petal, index) => (
          <span key={index} className="invitation-petal" style={{
            '--petal-x': petal.x,
            '--petal-size': `${petal.size}px`,
            '--petal-duration': `${petal.duration}s`,
            '--petal-delay': `${petal.delay}s`,
            '--petal-drift': `${petal.drift}px`,
            '--petal-rotation': `${petal.rotation}deg`,
          }} />
        ))}
      </div>
      <div className="invitation-dust">
        {particles.map(([x, y], index) => (
          <span key={index} className="invitation-dust-particle" style={{
            left: `${x}%`,
            top: `${y}%`,
            '--dust-size': `${index % 3 === 0 ? 2 : 1.5}px`,
            '--dust-duration': `${16 + index % 5 * 2}s`,
            '--dust-delay': `${-index * 2.3}s`,
          }} />
        ))}
      </div>
      <span className="invitation-reflection-shimmer" />
    </div>
  )
}
