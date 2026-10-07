export default function GoldDivider({ className = '' }) {
  return (
    <span className={`gold-divider ${className}`.trim()} aria-hidden="true">
      <span className="gold-divider__diamond" />
    </span>
  )
}
