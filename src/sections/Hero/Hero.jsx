import SectionShell from '../../components/layout/SectionShell'
import { weddingData } from '../../data/weddingData'
export default function Hero() {
  return <SectionShell id="hero" eyebrow="Together with their families" title={`${weddingData.bride} & ${weddingData.groom}`} theme="cinematic">
    <p>Joyfully invite you to share in their celebration.</p>
  </SectionShell>
}
