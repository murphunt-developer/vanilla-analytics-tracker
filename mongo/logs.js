import { getDb } from './db.js';

export async function writeLog({ level = 'info', message, metadata = {} }) {
  const db = getDb();
  const collection = db.collection('logs');

  return collection.insertOne({
    level,
    message,
    metadata,
    timestamp: new Date(),
  });
}

