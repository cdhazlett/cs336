// CS336 Lab 7 by Christiaan Hazlett (cdh24)
var express = require('express');
var app = express();


app.use(express.static('public'));

app.get('/fetch', function (req, res) {
  res.json(req.query.data);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
