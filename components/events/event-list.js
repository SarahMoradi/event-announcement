import EventItems from './event-items'

function EventList(props) {
  const { items } = props

  return (
    <ul>
      {items.map((event) => (
        <EventItems
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  )
}
export default EventList
