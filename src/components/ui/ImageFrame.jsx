export default function ImageFrame({ src, alt, className = '', imageClassName = '', loading = 'lazy', ...props }) {
  return (
    <div className={`image-frame ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`image-frame__image ${imageClassName}`.trim()}
        {...props}
      />
    </div>
  )
}
