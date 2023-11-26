import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors, { CorsOptions } from 'cors'
const path = require('path');

const app = express()
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: '*' as CorsOptions});

const data: any[] = []

app.use(express.static(path.join(__dirname, 'debugger/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'debugger/dist/index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('change', (msg) => {
    console.log(msg)
    const latestData = {...data[data.length - 1] } || {}
    Object.assign(latestData, { [msg.key]: msg.payload.contents, diff: msg.key })
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