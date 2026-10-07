const variantClasses = {
  primary: 'button--primary',
  secondary: 'button--secondary',
  'dark-gold': 'button--dark-gold',
}

export default function Button({ variant = 'primary', href, className = '', children, type = 'button', ...props }) {
  const classes = `button ${variantClasses[variant] ?? variantClasses.primary} ${className}`.trim()

  if (href) {
    return <a className={classes} href={href} {...props}>{children}</a>
  }

  return <button className={classes} type={type} {...props}>{children}</button>
}

export function PrimaryButton(props) {
  return <Button variant="primary" {...props} />
}

export function SecondaryButton(props) {
  return <Button variant="secondary" {...props} />
}

export function DarkGoldButton(props) {
  return <Button variant="dark-gold" {...props} />
}
