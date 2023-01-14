import { useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import axios from 'axios'
import classes from './comments.module.css'

function Comments(props) {
  const { eventId } = props

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
    // send data to API
    fetch('api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
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
