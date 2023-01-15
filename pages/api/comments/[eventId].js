import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../helpers/db-util'

async function handler(req, res) {
  const eventId = req.query.eventId

  let client
  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: 'Failed to connect to database.' })
    return
  }
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
      client.close()
      return
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    }

    let result
    try {
      result = await insertDocument(client, 'commnets', 'events', newComment)
      newComment._id = result.insertedId
      res.status(201).json({ message: 'Added comment.', comment: newComment })
      client.close()
    } catch (error) {
      res.status(500).json({ message: 'inserting data was failed.' })
    }
    // const db = client.db('events')
    // const result = await db.collection('commnets').insertOne(newComment)

    console.log(result)
   
  }

  // OR     if (req.method === 'GET'){}
  else {
    let documents
    try {
      documents = await getAllDocuments(client, 'commnets', 'events')
      res.status(200).json({ comments: documents })
    } catch (error) {
      res.status(500).json({ message: 'Faild to get data.' })
      return
    }
  }

  client.close()
}

export default handler
