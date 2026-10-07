import { useId } from 'react'

const petals = [
  { x: 5, y: -12, size: 12, drift: 24, travel: 94, turn: 190, duration: 8.5, delay: -3.2, shape: 0 },
  { x: 91, y: 8, size: 16, drift: -32, travel: 76, turn: -225, duration: 7.2, delay: -1.6, shape: 1 },
  { x: 13, y: 28, size: 10, drift: 18, travel: 54, turn: 160, duration: 6.8, delay: -4.7, shape: 2 },
  { x: 86, y: -16, size: 20, drift: -24, travel: 93, turn: 275, duration: 9.1, delay: -5.1, shape: 0 },
  { x: 3, y: 55, size: 23, drift: 26, travel: 47, turn: -180, duration: 6.3, delay: -2.4, shape: 1 },
  { x: 96, y: 42, size: 13, drift: -21, travel: 60, turn: 210, duration: 7.8, delay: -6.2, shape: 2 },
  { x: 21, y: -15, size: 9, drift: -18, travel: 96, turn: 240, duration: 8.9, delay: -7.4, shape: 0 },
  { x: 78, y: 4, size: 17, drift: 16, travel: 85, turn: -260, duration: 7.5, delay: -3.8, shape: 1 },
  { x: 9, y: 14, size: 11, drift: 32, travel: 70, turn: 175, duration: 9.4, delay: -8.1, shape: 2 },
]

const shapes = [
  'M12 2C5 5 2 13 5 21c2 6 6 9 7 9 2-3 9-9 9-17C21 7 17 3 12 2Z',
  'M10 2C4 7 3 15 7 23c2 4 5 6 7 7 2-4 8-11 7-18C20 5 15 2 10 2Z',
  'M13 2C7 3 3 9 3 17c0 7 6 12 10 13 4-5 8-11 8-18 0-5-3-9-8-10Z',
]

export default function PetalField() {
  const id = useId().replaceAll(':', '')

  return (
    <div className="petal-field" data-opening-petals aria-hidden="true">
      {petals.map((petal, index) => {
        const gradientId = `opening-petal-${id}-${index}`
        return (
          <svg
            key={index}
            className={`opening-petal ${index >= 7 ? 'opening-petal--desktop' : ''} ${petal.size >= 20 ? 'opening-petal--foreground' : ''}`}
            viewBox="0 0 24 32"
            style={{
              '--petal-x': `${petal.x}%`,
              '--petal-y': `${petal.y}%`,
              '--petal-size': `${petal.size}px`,
              '--petal-drift': `${petal.drift}px`,
              '--petal-travel': `${petal.travel}dvh`,
              '--petal-turn': `${petal.turn}deg`,
              '--petal-duration': `${petal.duration}s`,
              '--petal-delay': `${petal.delay}s`,
            }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#DE7E91" stopOpacity=".75" />
                <stop offset="55%" stopColor="#C75B72" stopOpacity=".65" />
                <stop offset="100%" stopColor="#8B2E3D" stopOpacity=".7" />
              </linearGradient>
            </defs>
            <path d={shapes[petal.shape]} fill={`url(#${gradientId})`} />
          </svg>
        )
      })}
    </div>
  )
}
