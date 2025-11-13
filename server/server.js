import { createSecureServer } from 'node:http2';
import { readFileSync } from 'node:fs';
import https from 'https';
import { logger, contentTypeMiddleware } from './middleware.js';
import { logBadActor } from './loggers.js';
import { 
  trackerJsFileHandler, 
  notFoundHanlder, 
  collectHandler, 
  dashboardHandler, 
  cssFileHandler 
} from './handlers.js';

// TODO: add client's domain(s) to this list for validation
const ALLOWED_DOMAINS = ['https://www.amazon.com'];
/*
To generate a cert and key for this example:
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem

TODO: remove once deployed to hostinger
*/

const options = {
  key: readFileSync('localhost-privkey.pem'),
  cert: readFileSync('localhost-cert.pem'),
};

// ---- HTTP/2 server for static JS ----
const h2Server = createSecureServer(options, (req, res) => {
  if (req.method === 'OPTIONS') {
    if (ALLOWED_DOMAINS.includes(req.headers.origin)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.writeHead(204);
      res.end();
      return;
    } else {
      res.writeHead(403).end('Forbidden');
      return;
    }
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    logger(req, res, () => {
      contentTypeMiddleware(req, res, async () => {
        if (req.headers.origin && !ALLOWED_DOMAINS.includes(req.headers.origin)) {
          logBadActor(req, 'badServerRequests.txt');
          res.writeHead(403).end('Forbidden');
        } else if (req.url === '/tracker.js' && req.method === 'GET') {
          await trackerJsFileHandler(req, res);
        } else {
          notFoundHanlder(req, res);
        }
      })
    });
  }
});
h2Server.listen(8443, () => console.log('HTTP/2 server running on 8443'));

// ---- HTTPS server for analytics ingest ----
const httpsServer = https.createServer(options, (req, res) => {
  logger(req, res, () => {
    contentTypeMiddleware(req, res, async () => {
      if (req.url === '/' && req.method === 'GET') {
        // TODO: implement logic
      } else if (req.url === '/collect' && req.method === 'POST') {
        await collectHandler(req, res);
      }  else if (req.url === '/dashboard' && req.method === 'GET') {
        await dashboardHandler(req, res);
      } else if (req.url === '/style.css' && req.method === 'GET') {
        await cssFileHandler(req, res);
      } else {
        notFoundHanlder(req, res);
      }
    })
  });
});


httpsServer.listen(8444, () => console.log('HTTPS server running on 8444'));

