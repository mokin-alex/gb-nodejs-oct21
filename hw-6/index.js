const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http
    .createServer(((req, res) => {
        const indexPath = path.join(__dirname, 'index.html');
        const readStream = fs.createReadStream(indexPath);

        readStream.pipe(res);
    }));

const io = socket(server);
io.on('connection', client => {

    console.log(client.id);
    const onConMsg = { message: 'New client with ID: ' + client.id + ' connected!',};

    client.broadcast.emit('server-msg', onConMsg);

    client.on('client-msg', data => {
        const payload = {
            message: client.id + ' :  ' + data.message,
        };
        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
});

server.listen(5555);