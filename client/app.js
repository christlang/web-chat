var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 8080;

app.use(express.static('public'));

http.listen(port, function(){
    console.log('listening on *:' + port);
    console.log('check out the client in your browse at http://localhost:' + port );
});

app.use(require('easy-livereload')());
