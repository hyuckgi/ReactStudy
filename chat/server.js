var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('src'));

app.get('/', function(req, res) {
    res.send('index.html');
});

io.on('connection', function(socket) {
    //console.log('a user connected');
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
    //socket.on('disconnect', function() {
    //  console.log('user disconnected');
    //});
});

http.listen(process.env.PORT || 8070, function() {
    console.log('listening on *:8070');
});