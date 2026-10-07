export default function SectionTitle({ as: Tag = 'h2', id, script = false, className = '', children }) {
  return (
    <Tag id={id} className={`section-title ${script ? 'type-script' : 'type-heading'} ${className}`.trim()}>
      {children}
    </Tag>
  )
}
