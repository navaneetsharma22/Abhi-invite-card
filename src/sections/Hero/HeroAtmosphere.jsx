import './HeroAtmosphere.css'

const petals = [
  { x: 64, y: -12, size: 11, drift: -25, turn: 120, duration: 12, delay: -3 },
  { x: 88, y: 8, size: 14, drift: -38, turn: -170, duration: 14, delay: -8 },
  { x: 76, y: -18, size: 9, drift: 20, turn: 145, duration: 11, delay: -5 },
  { x: 96, y: 36, size: 12, drift: -30, turn: -120, duration: 13, delay: -10 },
  { x: 58, y: 20, size: 10, drift: 32, turn: 160, duration: 15, delay: -7 },
  { x: 84, y: -8, size: 16, drift: -20, turn: -190, duration: 16, delay: -12 },
]

const dust = Array.from({ length: 15 }, (_, index) => ({
  x: 8 + ((index * 37 + 11) % 85),
  y: 15 + ((index * 29 + 7) % 72),
  size: 1 + (index % 4) * .35,
  alpha: .18 + (index % 5) * .04,
  duration: 6 + (index % 5) * 1.1,
  delay: -(index % 7) * 1.2,
  drift: -8 + (index % 6) * 3,
}))

export default function HeroAtmosphere() {
  return (
    <>
      <div className="hero-palace-atmosphere" aria-hidden="true">
        <div className="hero-palace-lights">
          <span /><span /><span /><span />
        </div>
        <div className="hero-water-shimmer"><span /></div>
      </div>

      <div className="hero-foreground-atmosphere" aria-hidden="true">
        <div className="hero-golden-dust">
          {dust.map((speck, index) => (
            <span
              key={index}
              className={`hero-dust-speck ${index >= 12 ? 'hero-atmosphere--desktop' : ''}`}
              style={{
                '--dust-x': `${speck.x}%`,
                '--dust-y': `${speck.y}%`,
                '--dust-size': `${speck.size}px`,
                '--dust-alpha': speck.alpha,
                '--dust-duration': `${speck.duration}s`,
                '--dust-delay': `${speck.delay}s`,
                '--dust-drift': `${speck.drift}px`,
              }}
            />
          ))}
        </div>
        <div className="hero-rose-petals">
          {petals.map((petal, index) => (
            <span
              key={index}
              className={`hero-rose-petal ${index === 5 ? 'hero-atmosphere--desktop' : ''}`}
              style={{
                '--petal-x': `${petal.x}%`,
                '--petal-y': `${petal.y}%`,
                '--petal-size': `${petal.size}px`,
                '--petal-drift': `${petal.drift}px`,
                '--petal-turn': `${petal.turn}deg`,
                '--petal-duration': `${petal.duration}s`,
                '--petal-delay': `${petal.delay}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}
