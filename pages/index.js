import EventList from '../components/events/event-list'
import EventSearch from '../components/events/event-search'
import { getFeaturedEvents } from '../dummy-data'

const HomePage = () => {
  const featuredEvents = getFeaturedEvents()
  return <EventList items={featuredEvents} />
}

export default HomePage
