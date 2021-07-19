const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

//const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app
    .use(express.static(__dirname + 'public'))
    .use(bodyParser.urlencoded({ limit: '50mb', extended: true}))
    .use(bodyParser.json({ limit: '50mb', extended: true}))
    .use(cors())

const http = require('http').Server(app);

const io = require('socket.io')(http,{
    cors: {
        origin: 'http://localhost:8080',
        methods: ["GET", "POST"]
    }
})

io.on('connection',(socket) => {
    console.log('connection ok');
    socket.on('message', msg => {
        io.emit('message', msg)
    });
})

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });



http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});