import { useId } from 'react'

function SmokeTrail({ side, blurId }) {
  return (
    <svg className={`incense-smoke__trail incense-smoke__trail--${side}`} viewBox="0 0 120 300" preserveAspectRatio="none">
      <defs>
        <filter id={blurId} x="-50%" y="-20%" width="200%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <path
        d="M61 290 C28 241 84 210 54 165 C22 121 83 93 49 43 C39 28 42 14 59 2"
        fill="none"
        stroke="rgba(245,240,225,.2)"
        strokeWidth="13"
        strokeLinecap="round"
        filter={`url(#${blurId})`}
      />
    </svg>
  )
}

export default function IncenseSmoke() {
  const id = useId().replaceAll(':', '')

  return (
    <div className="incense-smoke" data-opening-smoke aria-hidden="true">
      <SmokeTrail side="left" blurId={`opening-smoke-left-${id}`} />
      <SmokeTrail side="right" blurId={`opening-smoke-right-${id}`} />
    </div>
  )
}
