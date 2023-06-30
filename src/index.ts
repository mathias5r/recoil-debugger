import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app);
const io = new Server(server);

const data = {}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('change', (msg) => {
    console.log(msg)
    Object.assign(data, { [msg.key]: msg.payload.contents })
    io.emit("content", data)
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});