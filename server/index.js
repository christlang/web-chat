var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

var io = require('socket.io')(http, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:8080"]
  }
});
var port = process.env.PORT || 3000;

app.get('/dashboard', function(req, res){
  res.sendFile(__dirname + '/dashboard.html');
});

app.get('/client', function(req, res){
  res.sendFile(path.dirname(__dirname) + '/client/public/index.html');
});

app.get('/:folder/:file', function(req, res){
  res.sendFile(path.dirname(__dirname)  + `/client/public/${req.params.folder}/${req.params.file}`);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    let user = sanitize(msg.user) || undefined;
    let message = sanitize(msg.message);
    let timestamp = getFormattedDate();
    console.log(timestamp + ' user: ' + user + ' send message: ' + message);
    var result = {
      user: user,
      message: message,
      timestamp: timestamp
    };
    io.emit('chat message', result);
  });
});

function getFormattedDate() {
    var date = new Date();
    return date.toString();
}

function sanitize(msg) {
  if (msg) {
    const sanitizedLt = msg.replace(/</g, '&lt;');
    return sanitizedLt.replace(/>/g, '&gt;');
  }
}

http.listen(port, function(){
  console.log('listening on *:' + port);
  console.log('check out the dashboard of the chat server in your browser at http://localhost:' + port + '/dashboard');
});
