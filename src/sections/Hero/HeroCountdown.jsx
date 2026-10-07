import { useEffect, useState } from 'react'
import { weddingData } from '../../data/weddingData'

const monthNames = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]

const [dayText, monthText, yearText] = weddingData.wedding.date.split(' ')
const weddingDate = new Date(Number(yearText), monthNames.indexOf(monthText.toLowerCase()), Number(dayText))

function getRemainingTime() {
  const remaining = Math.max(0, weddingDate.getTime() - Date.now())
  const totalSeconds = Math.ceil(remaining / 1000)

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    mins: Math.floor((totalSeconds % 3600) / 60),
    secs: totalSeconds % 60,
    isWeddingDay: new Date().toDateString() === weddingDate.toDateString(),
  }
}

export default function HeroCountdown({ active }) {
  const [remaining, setRemaining] = useState(getRemainingTime)

  useEffect(() => {
    if (!active) return undefined
    const update = () => setRemaining(getRemainingTime())
    update()
    const interval = window.setInterval(update, 1000)
    return () => window.clearInterval(interval)
  }, [active])

  const { days, hours, mins, secs, isWeddingDay } = remaining
  const complete = days === 0 && hours === 0 && mins === 0 && secs === 0
  const units = [
    { label: 'DAYS', value: days },
    { label: 'HOURS', value: hours },
    { label: 'MINS', value: mins },
    { label: 'SECS', value: secs },
  ]

  return (
    <div className={`hero-countdown${complete ? ' hero-countdown--complete' : ''}`} role="timer" aria-label={complete
      ? (isWeddingDay ? 'Today is the wedding day' : 'The wedding day has begun')
      : `${days} days, ${hours} hours, ${mins} minutes, and ${secs} seconds until the wedding date`}>
      <span className="hero-countdown__heading">Counting down to forever</span>
      {complete ? (
        <span className="hero-countdown__message">{isWeddingDay ? 'TODAY IS THE DAY' : 'OUR FOREVER BEGINS'}</span>
      ) : (
        <div className="hero-countdown__grid" aria-hidden="true">
          {units.map(({ label, value }) => (
            <div className="hero-countdown__unit" key={label}>
              <span className="hero-countdown__number">{String(value).padStart(2, '0')}</span>
              <span className="hero-countdown__label">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
