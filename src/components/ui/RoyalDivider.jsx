export default function RoyalDivider({ size = 'md', className = '', ariaHidden = true, ...props }) {
  return (
    <svg
      className={`royal-divider royal-divider--${size === 'sm' ? 'sm' : 'md'} ${className}`.trim()}
      viewBox="0 0 260 24"
      fill="none"
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : 'img'}
      aria-label={ariaHidden ? undefined : 'Decorative royal divider'}
      {...props}
    >
      <line x1="1" y1="12" x2="109" y2="12" stroke="currentColor" strokeWidth="1" />
      <line x1="151" y1="12" x2="259" y2="12" stroke="currentColor" strokeWidth="1" />
      <path d="M118 12c5-1 8-4 12-9 4 5 7 8 12 9-5 1-8 4-12 9-4-5-7-8-12-9Z" stroke="currentColor" strokeWidth="1" />
      <path d="M122 12h16M130 6v12" stroke="currentColor" strokeWidth=".8" />
      <polygon points="112,12 115,9 118,12 115,15" fill="currentColor" />
      <polygon points="142,12 145,9 148,12 145,15" fill="currentColor" />
    </svg>
  )
}
