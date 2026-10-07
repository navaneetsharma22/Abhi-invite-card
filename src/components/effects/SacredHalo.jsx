export default function SacredHalo() {
  return (
    <div className="sacred-halo" data-opening-halo aria-hidden="true">
      <span className="sacred-halo__glow" />
      <svg className="sacred-halo__ornament" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="151" fill="none" stroke="currentColor" strokeWidth="1" opacity=".55" />
        <circle cx="200" cy="200" r="165" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 13" opacity=".55" />
        <circle cx="200" cy="200" r="139" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".3" />
        <path d="M200 19l5 10-5 10-5-10z M381 200l-10 5-10-5 10-5z M200 381l-5-10 5-10 5 10z M19 200l10-5 10 5-10 5z" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5" />
      </svg>
    </div>
  )
}
