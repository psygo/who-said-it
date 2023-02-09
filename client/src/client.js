import { io } from "socket.io-client";

import setup from "./game.js";

const socket = io("http://localhost:8088");

export default socket;

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("other-scores", (score, id) => {
  console.log(score, id);
});

setup();
