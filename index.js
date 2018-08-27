// Require stuff and set up app
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Define route
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// Define socket listeners
io.on('connection', function(socket) {
	console.log('A new connection');

	socket.on('chat message', function(msg) {
		// What to do if you receive a message from a client? Tell other clients about the message
		io.emit('chat message', msg);
	});

	// If you want to take any action on disconnection
	socket.on('disconnect', function() {
		console.log('Someone disconnected');
	});
});

http.listen(3000);