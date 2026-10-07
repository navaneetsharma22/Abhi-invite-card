import EventDetails from '../../components/ui/EventDetails'
import SectionShell from '../../components/layout/SectionShell'
import { weddingData } from '../../data/weddingData'
export default function Celebrations() {
  return <SectionShell id="celebrations" eyebrow="Join us" title="Celebrations" scriptTitle>
    <div className="celebrations-grid">
      <article className="event-card heritage-card"><h3>Haldi</h3><EventDetails event={weddingData.haldi} showTime /></article>
      <article className="event-card heritage-card"><h3>Wedding</h3><EventDetails event={weddingData.wedding} /></article>
    </div>
  </SectionShell>
}
