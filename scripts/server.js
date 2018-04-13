const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const opn = require('opn')

const port = 8070 || process.env.PORT

require('./watch')

const server = http.createServer(function (req, res) {
  let filePath = path.join(__dirname, '../', req.url)
  let extname = path.extname(filePath)
  let contentType = mime.getType(extname) || 'text/html'

  if (!filePath.match(/\.\w+$/)) {
    filePath = path.join(filePath, 'index.html')
  }

  fs.readFile(filePath, function(err, content) {
    if (err) {
      res.writeHead(404);
      res.end()
      return
    }

    res.writeHead(200, { 'Content-Type': contentType })
    res.end(content, 'utf-8')
  })
})

server.listen(port)
console.info(`Server running at http://127.0.0.1:${port}/`)
opn(`http://127.0.0.1:${port}/showoff/`);
