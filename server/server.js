/*eslint-env es6*/
const express = require('express');
const app = express();
const token = require('./auth/token');
const user = require('./api/user.route');

/*socke.io*/
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8100",
        methods: ["GET", "POST"]
    }
});

/*mongodb*/
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/chatbot";
const db_connect = mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
require('dotenv').config();
const cors = require('cors');
app.use(cors());

// if (app.get('env') === 'development') {

// }

app.use('/user', user);
//Socket.io
const socketModule = require('./chat/socket');
//Socket.io connection
io.on('connection', (socket) => {
    socketModule.socketConfig(socket, io);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log('Server listening on Port ', PORT);
});
