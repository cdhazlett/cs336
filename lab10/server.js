/* CS336 Lab10 by cdh24
 * Code adapted from Facebook tutorial
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db;

// Connect to the database and store connection in global var
MongoClient.connect('mongodb://cs336:COURSEPASSWORD@ds041939.mlab.com:41939/cdh24-cs336', function (err, dbConnection) {
  if (err) throw err

  db = dbConnection;
})

// var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Get comments from DB and return JSON data
app.get('/api/comments', function(req, res) {

  db.collection('comments').find({}).toArray(function(err,docs) {
    res.json(docs);
  });

});

// Add a comment to the DB
app.post('/api/comments', function(req, res) {

  db.collection('comments').insert({
    id: Date.now(),
    author: req.body.author,
    text: req.body.text
  });

});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
