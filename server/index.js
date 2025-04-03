var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/dashboard', function(req, res){
  res.sendFile(__dirname + '/dashboard.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    let user = msg.user || undefined;
    let message = msg.message;
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

http.listen(port, function(){
  console.log('listening on *:' + port);
  console.log('check out the dashboard of the chat server in your browser at http://localhost:' + port + '/dashboard');
});
