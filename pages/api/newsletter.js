import { MongoClient } from 'mongodb'

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid Email Address.' })
      return
    }

    const client = await MongoClient.connect(
      'mongodb+srv://sarah:4floYFa0MKtvWMcf@cluster0.l9uc8g1.mongodb.net/?retryWrites=true&w=majority'
    )
    const db = client.db('newsletter')
    await db.collection('emails').insertOne({ email: userEmail })
    client.close()

    res.status(201).json({ message: 'Your Email Was Suucessfully Verified.' })
  }
}
export default handler
