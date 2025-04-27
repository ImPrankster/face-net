import { Server } from "socket.io";
import { getMap, removeElement, updateMap } from "./map";

const io = new Server({
  cors: {
    origin: [
      "http://localhost:3001",
      "http://10.19.17.213:3001",
      "https://imprankster.github.io",
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  let clientId: string;

  socket.on("send_figure", (data) => {
    const d = JSON.parse(data);
    clientId = d[0];
    updateMap(d[0], d[1]);
    socket.emit("update_map", JSON.stringify(getMap()));
  });

  socket.on("disconnect", () => {
    removeElement(clientId);
  });
});

io.listen(3005);

console.log(`Server started: Listening on ${3005}`);
