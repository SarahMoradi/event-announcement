import { MongoClient } from 'mongodb'

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://sarah:4floYFa0MKtvWMcf@cluster0.l9uc8g1.mongodb.net/?retryWrites=true&w=majority'
  )
  return client
}

export async function insertDocument(client, collection, database, document) {
  const db = client.db(database)
  await db.collection(collection).insertOne(document)
}

export async function getAllDocuments(client, collection, database) {
  const db = client.db(database)
  await db.collection(collection).find().sort({ _id: -1 }).toArray()
}
