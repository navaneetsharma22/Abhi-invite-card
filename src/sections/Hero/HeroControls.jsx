import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Menu, Music2, VolumeX, X } from 'lucide-react'
import IconButton from '../../components/ui/IconButton'
import './HeroControls.css'

// Add the wedding track at this path to enable music without changing the controls.
const musicSource = '/audio/wedding-music.mp3'
const menuLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'invitation', label: 'Invitation' },
  { id: 'celebrations', label: 'Celebrations' },
  { id: 'couple', label: 'The Couple' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'venue', label: 'Venue' },
  { id: 'final-blessing', label: 'Final Blessing' },
]

export default function HeroControls() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [musicStatus, setMusicStatus] = useState('')
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const wantsMusicRef = useRef(false)
  const menuButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const drawerRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(musicSource)
    audio.loop = true
    audio.preload = 'none'
    audio.volume = 0
    audioRef.current = audio
    return () => {
      wantsMusicRef.current = false
      fadeRef.current?.kill()
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = drawerRef.current?.querySelectorAll('button, a[href]')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    fadeRef.current?.kill()
    if (wantsMusicRef.current) {
      wantsMusicRef.current = false
      setIsPlaying(false)
      setMusicStatus('Wedding music paused')
      if (audio.paused) return
      fadeRef.current = gsap.to(audio, {
        volume: 0,
        duration: .55,
        ease: 'power1.out',
        onComplete: () => { if (!wantsMusicRef.current) audio.pause() },
      })
      return
    }

    wantsMusicRef.current = true
    setMusicStatus('')
    if (audio.paused) audio.volume = 0
    try {
      await audio.play()
      if (!wantsMusicRef.current) {
        audio.pause()
        return
      }
      setIsPlaying(true)
      setMusicStatus('Wedding music playing')
      fadeRef.current = gsap.to(audio, { volume: .65, duration: .8, ease: 'power1.out' })
    } catch {
      wantsMusicRef.current = false
      setIsPlaying(false)
      setMusicStatus('Wedding music is unavailable until the audio track is added')
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <>
      <div className="hero-top-controls">
        <IconButton
          label={isPlaying ? 'Mute wedding music' : 'Play wedding music'}
          aria-pressed={isPlaying}
          onClick={toggleMusic}
        >
          {isPlaying ? <Music2 size={19} strokeWidth={1.6} aria-hidden="true" /> : <VolumeX size={19} strokeWidth={1.6} aria-hidden="true" />}
        </IconButton>
        <IconButton
          ref={menuButtonRef}
          label={isMenuOpen ? 'Close invitation menu' : 'Open invitation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="hero-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <Menu size={20} strokeWidth={1.6} aria-hidden="true" />
        </IconButton>
      </div>
      <span className="sr-only" role="status" aria-live="polite">{musicStatus}</span>

      {isMenuOpen && (
        <div className="hero-menu-layer">
          <button className="hero-menu-backdrop" type="button" tabIndex={-1} aria-label="Close invitation menu" onClick={closeMenu} />
          <nav id="hero-menu" ref={drawerRef} className="hero-menu-drawer" role="dialog" aria-modal="true" aria-labelledby="hero-menu-title">
            <div className="hero-menu-header">
              <span id="hero-menu-title">THE INVITATION</span>
              <IconButton ref={closeButtonRef} label="Close invitation menu" onClick={closeMenu}>
                <X size={20} strokeWidth={1.6} aria-hidden="true" />
              </IconButton>
            </div>
            <div className="hero-menu-divider" aria-hidden="true" />
            <div className="hero-menu-links">
              {menuLinks.map(({ id, label }, index) => (
                <a key={id} href={`#${id}`} onClick={() => setIsMenuOpen(false)}>
                  <span className="hero-menu-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
