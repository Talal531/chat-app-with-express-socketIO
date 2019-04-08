var express = require('express');
var socket = require('socket.io');

//app setup
var app = express();
var server = app.listen(4000, function(){
    console.log("server is up on port 4000");
});

//static files
app.use(express.static('public'));

// socket setup
var io = socket(server); // socket.io works on this server

// make a connection to the browser
io.on('connection', function(socket){
    console.log('made socket connection', socket.id)

    //get the data object from the client
    socket.on('chat', function(data){
        io.sockets.emit("chat", data) //send data back to the other client
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
})