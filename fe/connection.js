const myId = crypto.randomUUID();

let socket;

function setupSocket(url) {
  socket = io(url, {
    withCredentials: true,
  });
}

function startListen() {
  socket.on("update_map", (data) => {
    const d = JSON.parse(data);
    delete d[myId];
    setPoses(Object.values(d).map((v) => JSON.parse(v)));
  });
}

function sendJSON(obj) {
  socket.emit("send_figure", JSON.stringify([myId, JSON.stringify(obj)]));
}
