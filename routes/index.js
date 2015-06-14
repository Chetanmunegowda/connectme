//Import the modules required for building Connect Me application
var express = require('express');
var router = express.Router();
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

//variable users object contains the user names
var users = {};

//Port number 7000 is used for the sockets
http.listen(7000, function(){
 console.log('listening on *:7000');
});

//on successfull connection,server socket listens to join,send and disconnect events
io.on('connection',function(socket){

  /* on every join event, emit notify and notify-user events, to connected users
     which contains the list of connected users to teen connect as of now */
  socket.on('join',function(name){
      users[socket.id] = name;
      console.log(name +' has joined the chat')
      socket.emit('notify', ' You have connected to ConnectMe Chat Service');
      socket.broadcast.emit('notify', name +" has joined ");
      io.sockets.emit("notify-user", users);  
  });

  /* on every send event, emit Chat event, which contains the chatmsg
     and the user who sent it */
  socket.on('send', function(msg){
    io.sockets.emit('chat', users[socket.id], msg);
  })

  /* on every disconnect event, emit notify,notify-user, event, which 
     send the current users and user who left the chat */ 
  socket.on('disconnect', function(){
    io.sockets.emit('notify', users[socket.id] +' has left the ConnectMe Chat Service.');
    delete users[socket.id];
    io.sockets.emit('notify-user', users);
  });

});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Connect Me' });
});


module.exports = router;
