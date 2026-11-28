// Local preview server for the site, plus POST /save-file?name=math-equations.js, which writes the
// rendered equations built by tools/math-background/build.html into the site folder.
// Run from the project folder:  node tools/math-background/server.js   then open http://localhost:8765/
const http = require('http'), fs = require('fs'), path = require('path');
const root = process.cwd();
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'POST' && url.pathname === '/save-file') {
    const name = url.searchParams.get('name') || '';
    if (name !== 'math-equations.js') { res.writeHead(400); return res.end('bad name'); }
    let body = '';
    req.on('data', c => { body += c; if (body.length > 5e6) req.destroy(); });
    req.on('end', () => {
      if (!body.includes('window.MATH_BG')) { res.writeHead(400); return res.end('unexpected content'); }
      fs.writeFileSync(path.join(root, name), body);
      res.writeHead(200); res.end('saved ' + name);
    });
    return;
  }
  let p = decodeURIComponent(url.pathname); if (p.endsWith('/')) p += 'index.html';
  const fp = path.join(root, p);
  fs.readFile(fp, (e, d) => {
    if (e) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': types[path.extname(fp)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(d);
  });
}).listen(process.env.PORT || 8765);
