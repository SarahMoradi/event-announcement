import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
import EventList from '../../components/events/event-list'
import { Fragment } from 'react'
import ResultsTitle from '../../components/results-title/results-title'
import { getFilteredEvents } from '../../dummy-data'
import { useRouter } from 'next/router'

const FilteredEventsPage = () => {
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

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })
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

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

export default FilteredEventsPage
