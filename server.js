// server.js
const http = require('http');
const { exec } = require('child_process');

const PORT = 3001;
const BRANCH = 'master';
const REPO_DIR = '/app/workspace';

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/update') {
    console.log(`[hook] Pulling latest from ${BRANCH}…`);
    exec(`cd ${REPO_DIR} && git pull origin ${BRANCH}`, (err, stdout, stderr) => {
      if (err) {
        console.error('[hook] pull failed:', stderr);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('❌ pull failed\n' + stderr);
      }
      console.log('[hook] pull succeeded:', stdout);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('✅ pulled\n' + stdout);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Update-hook listening on port ${PORT}`);
});
