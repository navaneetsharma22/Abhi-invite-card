export default function EventDetails({ event, showTime = false }) {
  return (
    <div className="event-details">
      <p>{event.date}{showTime && <> · {event.time}</>}</p>
      <p>{event.venue}, {event.location}</p>
    </div>
  )
}
