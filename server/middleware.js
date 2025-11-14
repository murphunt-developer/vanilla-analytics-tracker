import path from 'path';
import { sendLog } from '../cloudwatch/logs.js';

// Logger middleware
export const logger = (req, _, next) => {
  sendLog(`${req.method} ${req.url}`);
  next();
}

// Content-Type middleware
export const contentTypeMiddleware = (req, res, next) => {
  const ext = path.extname(req.url).toLowerCase();
  let contentType = 'text/html';
  switch (ext) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.html':
      contentType = 'text/html';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.mov':
      contentType = 'video/quicktime';
      break;
    case '.mp4':
      contentType = 'video/mp4';
      break;
  }
  res.setHeader('Content-Type', contentType);
  next();
}

