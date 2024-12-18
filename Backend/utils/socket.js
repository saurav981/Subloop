const { Server: SocketIoServer } = require('socket.io');
const http = require('http');
const express = require('express');
require('dotenv').config();

// Create the Express app
const expressApp = express();

// Create the HTTP server and attach the Express app to it
const httpServer = http.createServer(expressApp);

// Set up the WebSocket server with CORS configuration
const socketServer = new SocketIoServer(httpServer, {
  cors: {
    origin: [process.env.FRONTEND_URL], // Allow connections from this origin
  },
});

// used to store online users
// Tracks user IDs and socket IDs
const userSocketMap = {};

const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

// Listen for WebSocket connections
socketServer.on('connection', (userSocket) => {
  // console.log('A user connected:', userSocket.id);

  const userId = userSocket.handshake.query.userId;
  if (userId) userSocketMap[userId] = userSocket.id;

  // socketServer.emit() is used to send events to all the connected clients
  socketServer.emit('getOnlineUsers', Object.keys(userSocketMap));

  // Listen for the disconnect event when the user disconnects
  userSocket.on('disconnect', () => {
    // console.log('A user disconnected:', userSocket.id);
    delete userSocketMap[userId];
    socketServer.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

// Export the WebSocket server, Express app, and HTTP server for use in other files
module.exports = { socketServer, expressApp, httpServer, getReceiverSocketId };
