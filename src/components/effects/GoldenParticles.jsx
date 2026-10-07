const particles = Array.from({ length: 28 }, (_, index) => ({
  x: 16 + ((index * 37 + 11) % 69),
  y: 21 + ((index * 29 + 7) % 55),
  size: 1 + ((index * 7) % 5) * 0.45,
  alpha: 0.18 + ((index * 3) % 5) * 0.055,
  duration: 3.7 + ((index * 11) % 8) * 0.42,
  delay: -((index * 17) % 11) * 0.37,
  drift: ((index * 13) % 21) - 10,
}))

export default function GoldenParticles() {
  return (
    <div className="golden-particles" data-opening-particles aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={index}
          className={`golden-particle ${index >= 20 ? 'golden-particle--desktop' : ''}`}
          style={{
            '--particle-x': `${particle.x}%`,
            '--particle-y': `${particle.y}%`,
            '--particle-size': `${particle.size}px`,
            '--particle-alpha': particle.alpha,
            '--particle-duration': `${particle.duration}s`,
            '--particle-delay': `${particle.delay}s`,
            '--particle-drift': `${particle.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
