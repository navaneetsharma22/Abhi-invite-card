export default function IconButton({ label, tone = 'dark', className = '', children, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`icon-button ${tone === 'light' ? 'icon-button--light' : ''} ${className}`.trim()}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  )
}
