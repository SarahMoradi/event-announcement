import classes from './comment-list.module.css'

function CommentList(props) {
  const { items } = props
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items ? (
        items.map((item) => (
          <li key={item.id}>
            <p>{item.text}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        ))
      ) : (
        <p>'no comment to show!'</p>
      )}
    </ul>
  )
}

export default CommentList
