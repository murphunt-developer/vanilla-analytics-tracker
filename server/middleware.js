import path from 'path';
import { sendLog } from '../cloudwatch/logs.js';
import util from 'node:util';

// Logger middleware
export const logger = (req, _, next) => {
  const format = (obj) => util.inspect(obj, { depth: null, colors: false, compact: false });
  sendLog(`
    ---------------------------------------------------------
    Method: ${req.method}
    Url: ${req.url}
    Query: ${format(req.query)}
    Ip: ${req.ip}
    Session: ${format(req.session)}
    Headers: ${format(req.headers)}
    Cookies: ${format(req.cookies)}
    ---------------------------------------------------------
  `);
  next();
};

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

