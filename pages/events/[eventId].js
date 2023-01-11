import ErrorAlert from '../../components/ui/error-alert'
import EventContent from '../../components/event-detail/event-content'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventSummary from '../../components/event-detail/event-summary'
import { Fragment } from 'react'
import { getEventById } from '../../dummy-data'
import { useRouter } from 'next/router'

// import { getAllEvents } from '../../helpers/api-util'
// import {getEventById} from '../../helpers/api-util'

const EventDetailsPage = () => {
  const route = useRouter()
  const eventId = route.query.eventId
  const event = getEventById(eventId)

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    )
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  )
}



// const EventDetailsPage = (props) => {

//   const event = props.speceficEvent;

//   if (!event) {
//     return (
//       <ErrorAlert>
//         <p>No event found!</p>
//       </ErrorAlert>
//     )
//   }

//   return (
//     <Fragment>
//       <EventSummary title={event.title} />
//       <EventLogistics
//         date={event.date}
//         address={event.location}
//         image={event.image}
//         imageAlt={event.title}
//       />
//       <EventContent>
//         <p>{event.description}</p>
//       </EventContent>
//     </Fragment>
//   )
// }

// export async function getStaticProps(context){

//   const eventIdInRoute = context.params.eventId;
//   const selectedEvent = await getEventById(eventIdInRoute)

//   return{
//     props:{
//       speceficEvent: selectedEvent
//     },
//     revalidate: 30
//   }
  
// }

// export async function getStaticPaths(){
  
//   const events = await getAllEvents()
//   const paths = events.map(event => ({params: {eventId : event.id}}))
//   return{
//     paths: paths,
//     fallback: false
//   }
// }


export default EventDetailsPage
