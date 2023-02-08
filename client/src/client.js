import { io } from "socket.io-client";

import setup from "./game.js";

setup();

const socket = io("http://localhost:8088");

socket.on("connect", () => {});
