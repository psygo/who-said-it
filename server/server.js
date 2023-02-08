const io = require("socket.io")(8088, {
  cors: {
    origin: ["http://localhost:8081"],
  },
});

io.on("connection", (socket) => {});
