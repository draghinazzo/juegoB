let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) =>{
    console.log('nueva coneccion');

    socket.on('izquierda', () =>{
        socket.broadcast.emit('jugadorIzquirda');
    });
});

var port = 2525;

http.listen(port, function(){
    console.log('escucha localhost', port);
});