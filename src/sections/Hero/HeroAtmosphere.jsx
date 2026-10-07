import './HeroAtmosphere.css'

// Petals fall across the whole stage; most drift down the right (palace) side,
// a few lighter ones cross the text column. Entries flagged `desktop` are hidden on small screens.
const petals = [
  { x: 64, y: -12, size: 13, drift: -30, turn: 140, duration: 11, delay: -3 },
  { x: 88, y: 8, size: 16, drift: -42, turn: -190, duration: 13, delay: -8 },
  { x: 76, y: -18, size: 11, drift: 24, turn: 165, duration: 10, delay: -5 },
  { x: 96, y: 30, size: 14, drift: -34, turn: -140, duration: 12, delay: -10 },
  { x: 54, y: 16, size: 12, drift: 36, turn: 180, duration: 14, delay: -7 },
  { x: 82, y: -6, size: 17, drift: -24, turn: -210, duration: 15, delay: -12 },
  { x: 70, y: 4, size: 12, drift: 28, turn: 150, duration: 12.5, delay: -1.5 },
  { x: 92, y: -14, size: 13, drift: -38, turn: -170, duration: 11.5, delay: -6.5 },
  { x: 44, y: -10, size: 10, drift: 30, turn: 130, duration: 13.5, delay: -9.5 },
  { x: 60, y: 24, size: 15, drift: -28, turn: -160, duration: 14.5, delay: -4.2 },
  { x: 22, y: -16, size: 9, drift: 34, turn: 120, duration: 15, delay: -11 },
  { x: 8, y: 6, size: 10, drift: 26, turn: -150, duration: 16, delay: -2.6 },
  { x: 34, y: 12, size: 11, drift: -22, turn: 170, duration: 14, delay: -13, desktop: true },
  { x: 78, y: 18, size: 14, drift: 32, turn: -180, duration: 12, delay: -8.8, desktop: true },
  { x: 98, y: -4, size: 12, drift: -40, turn: 200, duration: 13, delay: -0.8, desktop: true },
  { x: 50, y: -20, size: 13, drift: 20, turn: -130, duration: 15.5, delay: -14, desktop: true },
]

const dust = Array.from({ length: 20 }, (_, index) => ({
  x: 8 + ((index * 37 + 11) % 85),
  y: 15 + ((index * 29 + 7) % 72),
  size: 1.2 + (index % 4) * .4,
  alpha: .3 + (index % 5) * .06,
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
        <div className="hero-foreground-motion">
          <div className="hero-golden-dust">
            {dust.map((speck, index) => (
              <span
                key={index}
                className={`hero-dust-speck ${index >= 14 ? 'hero-atmosphere--desktop' : ''}`}
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
                className={`hero-rose-petal ${petal.desktop ? 'hero-atmosphere--desktop' : ''}`}
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
      </div>
    </>
  )
}
