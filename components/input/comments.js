import { useContext, useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import NotificationContext from '../../store/notification-context'
import axios from 'axios'
import classes from './comments.module.css'

function Comments(props) {
  const { eventId } = props

  const notificationCtx = useContext(NotificationContext)
  
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments)
        })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData) {
    
    notificationCtx.showNotification({
      title: 'Sending comments ...',
      message: 'Your comment is currently being stored in database.',
      status: 'pending',
    })
    // send data to API
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
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
        message: 'Your commnet was Sent!',
        status: 'success',
      })
    }).catch(error => {
      notificationCtx.showNotification({
        title: 'Error',
        message: error.message || 'Something went wrong!',
        status: 'error',
      })
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  )
}

export default Comments

// const headers = {
//   'Content-Type': 'application/json',
// }

// axios
//   .post(`api/comments/`, commentData, {
//     headers: headers,
//   })
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error))
