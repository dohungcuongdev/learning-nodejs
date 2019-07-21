const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.url === '/api/infor') {  // http://localhost:8080/api/infor
        const readStream = fs.createReadStream('./static/infor.json');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        readStream.pipe(res);
    }
    else if(req.url === '/img/Penguins.jpg') {  // http://localhost:8080/img/Penguins.jpg
        const readStream = fs.createReadStream('./static/Penguins.jpg');
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        readStream.pipe(res);
    } else {
        res.write('No Static Data');
        res.end();
    }
});

server.listen('8080');
console.log('server is running on localhost 8080');