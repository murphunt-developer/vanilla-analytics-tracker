// db.js
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

// Create low-level client
const client = new DynamoDBClient({
  region: "us-west-2",  // change to your region
  // credentials are automatically loaded from environment or AWS CLI
  // (AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY)
});

// Create high-level document client
export const ddb = DynamoDBDocumentClient.from(client);

// Example: save a record
export const saveItem = async (tableName, item) => {
  const cmd = new PutCommand({
    TableName: tableName,
    Item: item,
  });
  await ddb.send(cmd);
};

// Example: read a record
export const getItem = async (tableName, key) => {
  const cmd = new GetCommand({
    TableName: tableName,
    Key: key,
  });
  const { Item } = await ddb.send(cmd);
  return Item;
};
