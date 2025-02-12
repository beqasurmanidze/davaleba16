const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../frontend/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

app.get("/room", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/room.html"));
});

io.on("connection", (socket) => {
  console.log("მომხმარებელი დაეკავშირა");

  socket.on("publicMessage", (msg) => {
    socket.broadcast.emit("publicMessage", msg);
  });

  socket.on("joinRoom", ({ roomId, email }) => {
    socket.join(roomId);
    console.log(`${email} შეუერთდა რუმს: ${roomId}`);

    socket.to(roomId).emit("roomMessage", `${email} შეუერთდა რუმს`);

    socket.on("roomMessage", (msg) => {
      io.to(roomId).emit("roomMessage", `${email}: ${msg}`);
    });
  });

  socket.on("disconnect", () => {
    console.log("მომხმარებელი გათიშულია");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`სერვერი გაშვებულია პორტზე ${PORT}`);
});
