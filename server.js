const { readFile } = require('fs').promises;
const { createServer } = require('http');
const { extname } = require('path');

const PORT = 3000;

const contentType = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json'
};

const renderStatic = async (req, res) => {

  const filePath = `./public${req.url === '/' ? '/index.html' : req.url}`;
  
  const ext = extname(filePath);

  try {

    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType[ext] });
    res.end(data, 'utf-8');

  } catch(e) {

    res.writeHead(500);
    res.end(`Error with code ${e.code} occured`);

  }
}

const server = createServer(renderStatic);

server.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', 'App is started on http://localhost:' + PORT + ' ...');
});