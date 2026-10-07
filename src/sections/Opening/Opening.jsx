import { weddingData } from '../../data/weddingData'
import CinematicVignette from '../../components/effects/CinematicVignette'
export default function Opening() {
  return (
    <section id="opening" className="opening theme-cinematic" aria-label="Opening invitation">
      <CinematicVignette />
      <div className="opening__content">
        <p className="eyebrow">A celebration of love</p>
        <h1 className="type-names">{weddingData.bride} <span className="text-gold-400">&amp;</span> {weddingData.groom}</h1>
        <p className="opening__date">{weddingData.wedding.date}</p>
      </div>
    </section>
  )
}
