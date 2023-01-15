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

else{
    // open database
    const db = client.db('events');
    //get all data and get as an array and sort by _id as desc
    const documents = await db.collection('commnets').find().sort({_id: -1}).toArray()
    res.status(200).json({ comments: documents })
  }

  client.close()
}

export default handler
