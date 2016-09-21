// Lab 03 for CS336
// by Christiaan Hazlett

// Import dependencies
var express = require('express');
var app = express();
var fs = require('fs');

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/hello', function (req, res) {
  // Send some plain text when /hello is requested
  res.set('Content-Type', 'text/plain');
  res.send('Hello, Express.js world!');
});

// Init HTTP server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
