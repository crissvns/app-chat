const express = require('express');
const app = express();

const server = app.listen(3000, () => {
    console.log('Servidor online');
});

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {

    socket.broadcast.emit('connect_new_user', { client_id: socket.id });

    socket.on('new_message', (data) => {
        socket.emit('render_message', { message: data.message, client_id: socket.id, usuario: data.usuario });
        socket.broadcast.emit('render_message', { message: data.message, client_id: socket.id, usuario: data.usuario });
    });

    // console.log('Client ' + socket.id + ' conectou');

    // //RECEIVE MESSAGE
    // socket.on("SERVER_EVENT_1", (data) => {

    // });

    // //SEND MESSAGE ONLY FOR A CONNECTED CLIENT
    // socket.emit('CLIENT_EVENT_1', { data: 'some data' });

    // //SEND MESSAGE TO ALL CONNECTED CLIENTS
    // socket.broadcast.emit('CLIENT_EVENT_1', { data: 'some data' });

    // //SEND MESSAGE TO A SPECIFIC CLIENT
    // socket.broadcast.to('SPECIFIC_ID').emit('CLIENT_EVENT_1', { data: 'some data' });

});