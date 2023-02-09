const io = require("socket.io")(8088, {
  cors: {
    origin: ["http://localhost:8081"],
  },
});

io.on("connect", (socket) => {
  console.log("New client connected");

  socket.on("score-msg", (score) => {
    console.log(score);

    socket.broadcast.emit("other-scores", score, socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
