var express = require('express');
var router = express.Router();
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello!');
});

module.exports = router;
