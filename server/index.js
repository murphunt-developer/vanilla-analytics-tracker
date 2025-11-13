import { createSecureServer } from 'node:http2';
import { appendFileSync, readFileSync, createReadStream } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import https from 'https';

// TODO: add client's domain(s) to this list for validation
const ALLOWED_DOMAINS = ['https://www.amazon.com'];
/*
To generate a cert and key for this example:
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem

TODO: remove once deployed to hostinger
*/

// const __dirname = new URL('.', import.meta.url).pathname;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_DIR = join(__dirname, '../client');

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
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers.origin && !ALLOWED_DOMAINS.includes(req.headers.origin)) {
    logBadActor(req, 'badServerRequests.txt');
    return res.writeHead(403).end('Forbidden');
  }
  logServerRequest(req, 'trackerJsLogs.txt');
  if (req.url === '/tracker.js') {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    const filePath = join(CLIENT_DIR, 'tracker.js');
    createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});
h2Server.listen(8443, () => console.log('HTTP/2 server running on 8443'));

// ---- HTTPS server for analytics ingest ----
const httpsServer = https.createServer(options, (req, res) => {
  logServerRequest(req, 'logs.txt');
  if (req.method === 'POST' && req.url === '/collect') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      logAnalyticsData('analytics.txt', body);
      res.writeHead(200);
      res.end('ok');
    });
  } else {
    res.writeHead(404);
    res.end('not found');
  }
});
httpsServer.listen(8444, () => console.log('HTTPS server running on 8444'));


/**
 * Helper function to log bad requests
 * @param {*} req 
 */
const logBadActor = (req, file) => {
  const request = {
    domain: req.headers.origin,
    userAgent: req.headers['user-agent'],
    timestamp: Date.now()
  }
  appendFileSync(file, JSON.stringify(request) + '\n-------------------------------------------------\n');
}

/**
 * Helper function to log request data to log file.
 * @param {*} req 
 */
const logServerRequest = (req, file) => {
  const request = {
    userAgent: req.headers['user-agent'],
    timestamp: Date.now()
  }
  appendFileSync(file, JSON.stringify(request) + '\n-------------------------------------------------\n');
}

/**
 * Helper function to log analytics data
 * TODO: integrate with datastore, for now logging locally
 * @param {*} req 
 */
const logAnalyticsData = (file, data) => {
  const request = {
    data,
    timestamp: Date.now()
  }
  appendFileSync(file, JSON.stringify(request) + '\n-------------------------------------------------\n');
}