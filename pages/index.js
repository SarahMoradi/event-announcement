import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../dummy-data'
// import { getFeaturedEvents } from '../helpers/api-util'

const HomePage = () => {
  const featuredEvents = getFeaturedEvents()
  return <EventList items={featuredEvents} />
}

// const HomePage = (props) => {
//   return <EventList items={props.events} />
// }
// export async function getStaticProps() {
//   const featuredEvents = await getFeaturedEvents()
//   return {
//     props: {
//       events: featuredEvents,
//     },
//   }
// }

export default HomePage
