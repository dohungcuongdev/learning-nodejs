const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('index page'); // http://localhost:8080
        res.end();
    } else {
        res.write('antoher page'); // http://localhost:8080/abcxyz
        res.end();
    }
});

server.listen('8080');
console.log('server is running on localhost 8080');