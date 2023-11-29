import { MongoClient } from 'mongodb'

if (!process.env.MONGO_URI || !process.env.MONGO_DATABASE_USERNAME || !process.env.MONGO_DATABASE_PASSWORD || !process.env.MONGO_DATABASE) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"')
}

const uri = process.env.MONGO_URI
const options = {
  auth: {
    username: process.env.MONGO_DATABASE_USERNAME,
    password: process.env.MONGO_DATABASE_PASSWORD
  }
}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

const dbPromise = async () => {
  const client: MongoClient = await clientPromise
  return client.db(process.env.MONGO_DATABASE)
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default dbPromise
