import SectionShell from '../../components/layout/SectionShell'
import { weddingData } from '../../data/weddingData'
export default function Venue() {
  return <SectionShell id="venue" eyebrow="The celebration awaits" title="Venue">
    <p>{weddingData.wedding.venue}, {weddingData.wedding.location}</p>
  </SectionShell>
}
