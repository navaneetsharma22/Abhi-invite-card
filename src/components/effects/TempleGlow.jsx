const lights = ['upper-left', 'upper-right', 'lower-left', 'lower-right', 'lower-center']

export default function TempleGlow() {
  return (
    <div className="temple-glow" data-opening-temple-glow aria-hidden="true">
      {lights.map((light) => <span key={light} className={`temple-glow__light temple-glow__light--${light}`} />)}
    </div>
  )
}
