import EventList from '../components/events/event-list'
import NewsletterRegistration from '../components/input/newsletter-registration'
import { getFeaturedEvents } from '../dummy-data'
// import { getFeaturedEvents } from '../helpers/api-util'

const HomePage = () => {
  const featuredEvents = getFeaturedEvents()
  return (
    <div>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  )
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
//    revalidate: 1800
//   }
// }

export default HomePage
