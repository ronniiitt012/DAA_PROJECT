/**
 * Simple static file server — no npm install needed.
 * Uses only Node.js built-in modules: http, fs, path.
 *
 * Run:  node server.js
 * Open: http://localhost:3000
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT      = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css' : 'text/css',
  '.js'  : 'application/javascript',
  '.json': 'application/json',
  '.ico' : 'image/x-icon',
  '.png' : 'image/png',
  '.svg' : 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  // Serve index.html for root
  let urlPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(PUBLIC_DIR, urlPath);

  // Security: prevent path traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 — file not found: ${urlPath}`);
      return;
    }
    const ext      = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ┌──────────────────────────────────────────────┐');
  console.log('  │  News Feed Ranking System — server running    │');
  console.log('  │                                              │');
  console.log(`  │  Local:   http://localhost:${PORT}             │`);
  console.log('  │                                              │');
  console.log('  │  Press Ctrl+C to stop                        │');
  console.log('  └──────────────────────────────────────────────┘');
  console.log('');
});
