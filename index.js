var express = require("express");
//create an application
var app = express();
//register a port
var port = 3700;

//set the directory and the html template engine, jade
app.set('views', __dirname+ '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

//res is the response object
app.get("/", function(req, res){
  //render just sends our jade code to the client
  res.render("page");
});

//tell the script where the front end js is
app.use(express.static(__dirname + '/public'));

//integrate with socket.io
//effectively passes the express server to socket.io
var io = require('socket.io').listen(app.listen(port));

//make a connection handler
//socket is the user's socket
io.sockets.on('connection', function(socket) {
  //upon a successful connection...
  socket.emit('message', {message: 'welcome to the chat'});
  //receives messages from the client (from the send button)
  socket.on('send', function (data) {
    //displays the user's message/sends to all other sockets
    //notice the plural sockets
    io.sockets.emit('message', data);
  });
})