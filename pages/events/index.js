import EventList from '../../components/events/event-list'
import EventSearch from '../../components/events/event-search'
import { Fragment } from 'react'
import { getAllEvents } from '../../dummy-data'
import { useRouter } from 'next/router'

// import { getAllEvents } from '../../helpers/api-util'


const AllEventsPage = () => {
  const events = getAllEvents()
  const router = useRouter()

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  )
}


// const AllEventsPage = (props) => {

//   const {allEvents} = props;
//   const router = useRouter()

//   function findEventsHandler(year, month) {
//     const fullPath = `/events/${year}/${month}`
//     router.push(fullPath)
//   }

//   return (
//     <Fragment>
//       <EventSearch onSearch={findEventsHandler} />
//       <EventList items={events} />
//     </Fragment>
//   )
// }

// export async function getStaticProps(){
//   const events = await getAllEvents()
  
//   return{
//     props:{
//       allEvents: events
//     },
//     revalidate: 60
//   }
// }

export default AllEventsPage
