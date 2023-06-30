import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app);
const io = new Server(server);

const data: any[] = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('change', (msg) => {
    const latestData = {...data[data.length - 1] } || {}
    Object.assign(latestData, { [msg.key]: msg.payload.contents, date: new Date() })
    data.push(latestData)
    io.emit("content", latestData)
  });
  
  socket.on('init', (msg) => {
    const latestData = data[data.length - 1]
    io.emit("content", latestData)
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});