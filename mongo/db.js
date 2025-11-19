import { MongoClient, ServerApiVersion } from 'mongodb';
// uri: mongodb+srv://murphunt:bgS4MIJMTnL6YXag@cluster0.udktiqz.mongodb.net/?appName=Cluster0
// db user: murphunt
// password: bgS4MIJMTnL6YXag

let client;
let db;

export async function connectToMongo() {
  if (db) return db;

  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI missing from .env');

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();

  db = client.db(process.env.MONGO_DB || 'analytics');

  console.log('MongoDB connected', db.databaseName);

  return db;
}

export function getDb() {
  if (!db) throw new Error('Mongo not initialized! Call connectToMongo first.');
  return db;
}
