'use strict';

const webSocket = require('ws');

module.exports = (server) => {
    const wss = new webSocket.Server({
        server: server,
        clientTracking: true,
        handleProtocols: () => {return 'json';}
    });

    function broadcastExcept(ws, data) {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === webSocket.OPEN) {
                let parsedData = JSON.parse(data);
                    let msg = {
                        username: parsedData.username,
                        message: parsedData.message,
                        timestamp: Date()
                    };
                    client.send(JSON.stringify(msg));
            }
        });
    }

    wss.on('connection', (ws) => {
        broadcastExcept(ws, JSON.stringify({message: `New client connected (${wss.clients.size})`, username: "Server"}));

        ws.on('message', (message) => {
            console.log("Received: %s", message);
            broadcastExcept(ws, message);
        });

        ws.on("error", (error) => {
            console.log(`Server error: ${error}`);
        });

        ws.on('close', (code, reason) => {
            console.log(`Closing connection: ${code} ${reason}`);
            broadcastExcept(ws, JSON.stringify({message: `Client disconnected (${wss.clients.size}).`, username: "Server"}));
        });
    });
    return wss;
};
