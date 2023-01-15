import { MongoClient } from 'mongodb'

async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://sarah:4floYFa0MKtvWMcf@cluster0.l9uc8g1.mongodb.net/?retryWrites=true&w=majority'
  )
  return client
}
async function insertDocument(client, document) {
  const db = client.db('newsletter')
  await db.collection('emails').insertOne(document)
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid Email Address.' })
      return
    }

    let client ;
    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({message: 'Failed to connect.'})
      return
    }

    try {
      await insertDocument(client, { email: userEmail })
      client.close()
    } catch (error) {
      res.status(500).json({message: 'Failed to insert to database.'})
      return
    }
  
    res.status(201).json({ message: 'Your Email Was Suucessfully Verified.' })
  }
}
export default handler
