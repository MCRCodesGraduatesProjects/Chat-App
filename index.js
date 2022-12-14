const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
}); //in case server and client run on different urls

io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);
  
  socket.on("client message", (msg) => {
    console.log("message: " + msg);
    
    socket.emit("server message", "Hello from server!!");
  });
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
