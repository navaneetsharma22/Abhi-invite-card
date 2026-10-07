import { useCallback, useEffect, useState } from 'react'
import Opening from './sections/Opening/Opening'
import Hero from './sections/Hero/Hero'
import Invitation from './sections/Invitation/Invitation'
import Celebrations from './sections/Celebrations/Celebrations'
import Couple from './sections/Couple/Couple'
import Gallery from './sections/Gallery/Gallery'
import Venue from './sections/Venue/Venue'
import FinalBlessing from './sections/FinalBlessing/FinalBlessing'
export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const handleOpeningComplete = useCallback(() => setIntroComplete(true), [])

  useEffect(() => {
    if (introComplete) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [introComplete])

  return (
    <>
      {!introComplete && <Opening onComplete={handleOpeningComplete} />}
      <main inert={!introComplete} aria-hidden={!introComplete}>
        <Hero />
        <Invitation />
        <Celebrations />
        <Couple />
        <Gallery />
        <Venue />
        <FinalBlessing />
      </main>
    </>
  )
}
