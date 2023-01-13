function handler(req, res) {
  const eventId = req.query.eventId

  if (req.method === 'POST') {
    const { email, name, text } = req.body
    if (
      !email ||
      !name ||
      !text ||
      !email.includes('@') ||
      name.trim() === ' ' ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' })
      return
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    }
    console.log(newComment)

    res.status(201).json({ message: 'Added comment.', comment: newComment })
  }

  
  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'sarah', text: 'First Comment' },
      { id: 'c2', name: 'moradi', text: 'Second Comment' },
    ]
    res.status(200).json({ comments: dummyList })
  }
}

export default handler
