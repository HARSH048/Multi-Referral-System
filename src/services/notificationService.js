const WebSocket = require('ws');
let connections = [];

// Initialize WebSocket server
exports.initWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New client connected');
    connections.push(ws);

    ws.on('close', () => {
      console.log('Client disconnected');
      connections = connections.filter((conn) => conn !== ws);
    });
  });
};

// Send live updates to all connected clients
exports.sendNotification = (data) => {
  connections.forEach((conn) => {
    conn.send(JSON.stringify(data));
  });
};
