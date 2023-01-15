import {connectDatabase, insertDocument} from '../../helpers/db-util'

import { MongoClient } from 'mongodb'

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
      await insertDocument(client, 'email', 'newsletter', { email: userEmail })
      client.close()
    } catch (error) {
      res.status(500).json({message: 'Failed to insert to database.'})
      return
    }
  
    res.status(201).json({ message: 'Your Email Was Suucessfully Verified.' })
  }
}
export default handler
