import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import EventList from '../../components/events/event-list'
import { Fragment } from 'react'
import ResultsTitle from '../../components/results-title/results-title'
import { getFilteredEvents } from '../../dummy-data'
import { useRouter } from 'next/router'

// import {getFilteredEvents} from '../../helpers/api-util'

const FilteredEventsPage = (props) => {
  const router = useRouter()
  const filteredData = router.query.slug

  const filteredYear = filteredData?.[0] //"2020"
  const filteredMonth = filteredData?.[1] //"2"

  const numYear = +filteredYear //2020
  const numMonth = +filteredMonth //2

  if (!filteredData) {
    return <p className='center'>Loading...</p>
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter! Please adjust your values.</p>
        </ErrorAlert>
        <Button link='/events'>Show All Events</Button>
      </Fragment>
    )
  }
  // if (props.hasError) {
  //   return (
  //     <Fragment>
  //       <ErrorAlert>
  //         <p>Invalid filter! Please adjust your values.</p>
  //       </ErrorAlert>
  //       <Button link='/events'>Show All Events</Button>
  //     </Fragment>
  //   )
  // }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  // const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for choosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth - 1)
  
  // const date = new Date(props.date.year, props.date.month -1)

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

// export async function getServerSideProps(context) {
//   const { params } = context
//   const filteredData = params.slug

//   const filteredYear = filteredData?.[0] //"2020"
//   const filteredMonth = filteredData?.[1] //"2"

//   const numYear = +filteredYear //2020
//   const numMonth = +filteredMonth //2

//   if (!filteredData) {
//     return <p className='center'>Loading...</p>
//   }

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true }, // add new module for it
//       notFound: true,
//       redirect: {
//         destination: '/error'
//        }
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   })

//   return {
//     props: {
//       events: filteredEvents,
//       dates: {
//         year: numYear,
//         month: numMonth
//       }
//     },
//   }
// }

export default FilteredEventsPage
