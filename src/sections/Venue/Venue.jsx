import { Map, MapPin, Navigation } from 'lucide-react'
import { weddingData } from '../../data/weddingData'
import RoyalDivider from '../../components/ui/RoyalDivider'
import Button from '../../components/ui/Button'
import './Venue.css'

export default function Venue() {
  const venueName = weddingData.venue?.name || weddingData.wedding.venue
  const venueAddress = weddingData.venue?.address || weddingData.wedding.location
  const venuePhoto = weddingData.venue?.photo ?? null
  const mapUrl = weddingData.venue?.mapUrl || 'https://maps.google.com/?q=Anmol+Marriage+Hall+Khadda'
  const directionsUrl = weddingData.venue?.directionsUrl || 'https://www.google.com/maps/dir/?api=1&destination=Anmol+Marriage+Hall+Khadda'

  return (
    <section
      id="venue"
      className="venue-section"
      aria-labelledby="venue-title"
    >
      <div className="venue-stage">
        {/* Approved background artwork canvas */}
        <img
          className="venue-bg"
          src="/images/venue/venue-bg.webp.png"
          alt=""
          aria-hidden="true"
          width="941"
          height="1672"
          loading="lazy"
          decoding="async"
        />

        {/* Minimal top transition feather from Couple section */}
        <div className="venue-transition" aria-hidden="true" />

        {/* ── Main Header ── */}
        <header className="venue-header">
          <h2 id="venue-title" className="venue-title">
            The Venue
          </h2>
          <p className="venue-subtitle">
            LET’S CELEBRATE TOGETHER
          </p>
          <RoyalDivider size="sm" className="venue-divider venue-divider--top" />
        </header>

        {/* ── Large Venue Photo Container (Prepared slot; empty until real photo is provided) ── */}
        <div className="venue-photo-container">
          {venuePhoto && (
            <img
              src={venuePhoto}
              alt={venueName}
              className="venue-photo"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        {/* ── Venue Details (Real wedding venue data) ── */}
        <div className="venue-details">
          <h3 className="venue-name">{venueName}</h3>
          <p className="venue-address">
            <MapPin size={14} className="venue-pin-icon" aria-hidden="true" />
            <span>{venueAddress}</span>
          </p>
        </div>

        {/* ── Action Buttons ── */}
        <div className="venue-actions">
          <Button
            variant="primary"
            className="venue-btn venue-btn--map"
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Map size={15} className="venue-btn-icon" aria-hidden="true" />
            <span>VIEW MAP</span>
          </Button>

          <Button
            variant="dark-gold"
            className="venue-btn venue-btn--directions"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation size={15} className="venue-btn-icon" aria-hidden="true" />
            <span>GET DIRECTIONS</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
