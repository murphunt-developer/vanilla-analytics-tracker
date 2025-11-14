import path from 'path';
import fsSync from 'fs';
import fs from 'fs/promises';
import url from 'url';
import { emitAnalyticsData } from '../cloudwatch/metrics.js';

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const CLIENT_DIR = path.join(__dirname, '../client');

// Dashboard page handler
export const dashboardHandler = async (req, res, next) => {
  const filePath = path.join(__dirname, '../public', 'dashboard.html');
  const data = await fs.readFile(filePath);
  res.write(data);
  res.end();
}

// collect hanlder
export const collectHandler = async (req, res, next) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    await emitAnalyticsData(body);
    res.writeHead(200);
    res.end('ok');
  });
}

// CSS handler
export const cssFileHandler = async (req, res, next) => {
  const filePath = path.join(__dirname, 'public', 'style.css');
  if (!fsSync.existsSync(filePath)) {
    res.statusCode = 404;
    res.end('File not found');
    return;
  }
  res.statusCode = 200;
  const stream = fsSync.createReadStream(filePath);
  stream.pipe(res);
  stream.on('error', err => {
    console.error(err);
    res.statusCode = 500;
    res.end('Server error');
  });
}

// tracker.js file handler
export const trackerJsFileHandler = async (req, res, next) => {
  res.writeHead(200, { 'Content-Type': 'application/javascript' });
  const filePath = path.join(CLIENT_DIR, 'tracker.js');
  fsSync.createReadStream(filePath).pipe(res);
}

// not found handler
export const notFoundHanlder = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: 'Route not found' }));
  res.end();
}
