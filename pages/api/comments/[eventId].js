import { MongoClient } from 'mongodb'

async function handler(req, res) {
  const eventId = req.query.eventId

  const client = await MongoClient.connect(
    'mongodb+srv://sarah:4floYFa0MKtvWMcf@cluster0.l9uc8g1.mongodb.net/?retryWrites=true&w=majority'
  )

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
      email,
      name,
      text,
      eventId,
    }
    const db = client.db('events')
    const result = await db.collection('commnets').insertOne(newComment)
    newComment.id = result.insertedId;
    
    console.log(result)
    res.status(201).json({ message: 'Added comment.', comment: newComment })
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'sarah', text: 'First Comment' },
      { id: 'c2', name: 'moradi', text: 'Second Comment' },
    ]
    res.status(200).json({ comments: dummyList })
  }

  client.close()
}

export default handler
