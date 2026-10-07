import SectionShell from '../../components/layout/SectionShell'
import { weddingData } from '../../data/weddingData'
export default function Couple() {
  return <SectionShell id="couple" eyebrow="Two hearts" title="The Couple" scriptTitle>
    <p>{weddingData.bride} &amp; {weddingData.groom}</p>
  </SectionShell>
}
