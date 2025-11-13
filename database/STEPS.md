# Bare-Bones DynamoDB Integration for Node.js

This guide shows the minimal setup to integrate AWS DynamoDB with a Node.js application.

---

## 🧩 1. Install Dependencies

```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

These are part of the AWS SDK v3 — modular, tree-shakeable, and ES-module–friendly.

---

## ⚙️ 2. Basic Setup (ES Module Version)

```js
// db.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

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
```

---

## 💡 3. Example Usage in Your Server

```js
// server.js
import https from 'https';
import { readFileSync } from 'fs';
import { saveItem } from './db.js';

const options = {
  key: readFileSync('localhost-privkey.pem'),
  cert: readFileSync('localhost-cert.pem'),
};

const httpsServer = https.createServer(options, async (req, res) => {
  if (req.method === 'POST' && req.url === '/collect') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      const data = JSON.parse(body);
      await saveItem('murphunt-analytics', {
        id: Date.now().toString(),
        ...data,
      });
      res.writeHead(200);
      res.end('ok');
    });
  } else {
    res.writeHead(404);
    res.end('not found');
  }
});

httpsServer.listen(8444, () => console.log('HTTPS server running on 8444'));
```

---

## 🔑 4. Environment Setup

You can provide AWS credentials in any of these ways:

1. **Environment variables:**
   ```bash
   export AWS_ACCESS_KEY_ID=yourKey
   export AWS_SECRET_ACCESS_KEY=yourSecret
   export AWS_REGION=us-west-2
   ```

2. **AWS CLI config file** (`~/.aws/credentials`).

---

## 🧪 5. DynamoDB Table Setup

Create the table in AWS:

```bash
aws dynamodb create-table   --table-name murphunt-analytics   --attribute-definitions AttributeName=id,AttributeType=S   --key-schema AttributeName=id,KeyType=HASH   --billing-mode PAY_PER_REQUEST   --region us-west-2
```

---

## ✅ 6. Minimal Working Flow

1. Your frontend script sends a POST with JSON analytics data.  
2. The Node.js server receives it and calls `saveItem()` to insert into DynamoDB.  
3. You can later use `getItem()` or query APIs to retrieve it.

---

That’s the minimal working DynamoDB integration for a Node.js analytics service.
