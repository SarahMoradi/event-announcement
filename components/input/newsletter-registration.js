import { useContext, useRef, useState } from 'react'

import NotificationContext from '../../store/notification-context'
import classes from './newsletter-registration.module.css'

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext)
  const [status, setStatus] = useState()
  const userEmail = useRef()

  function registrationHandler(event) {
    event.preventDefault()
    const enteredEmail = userEmail.current.value

    notificationCtx.showNotification({
      title: 'Signing up ...',
      message: 'Registering for newsletter.',
      status: 'pending',
    })

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    // one problem is that 400 and 500 errors are not cause to be failed and catch block happen
    if (enteredEmail.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          return response.json().then((data) => {
            throw new Error(data.message || 'Something went wrong!')
          })
        })
        .then((data) => {
          notificationCtx.showNotification({
            title: 'Success',
            message: 'Successfully Registered for newsletter!',
            status: 'success',
          })
        })
        .catch((error) => {
          notificationCtx.showNotification({
            title: 'Error',
            message: error.message || 'Something went wrong!',
            status: 'error',
          })
        })
    }

    // console.log(status, 'status')
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={userEmail}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  )
}

export default NewsletterRegistration
