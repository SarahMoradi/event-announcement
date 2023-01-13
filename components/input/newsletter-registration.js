import { useRef, useState } from 'react'

import classes from './newsletter-registration.module.css'

function NewsletterRegistration() {
  const [status, setStatus] = useState()
  const userEmail = useRef()

  function registrationHandler(event) {
    event.preventDefault()
    const enteredEmail = userEmail.current.value

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    if (enteredEmail.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
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
