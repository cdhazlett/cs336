// CS 336 Homework 03
// Author: Christiaan Hazlett
// Date: 11-18-16

var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var db;

// Connect to the database and store connection in global var
MongoClient.connect('mongodb://cs336:bjarne@ds159217.mlab.com:59217/cdh24-cs336-hw-3', function (err, dbConnection) {
  if (err) throw err

  db = dbConnection;
})

// Init the body and cookie parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static file routes
app.use('/', express.static(path.join(__dirname, 'dist')));

// Deafult homepage text
app.get('/', function (req, res) {
  res.send('Hello.  Use /people, /people/id, /people/id/name, or /people/id/years to view stuff.');
});

// Simply return the entire data structure as JSON
app.get('/people', function (req, res) {
  db.collection('users').find({}).toArray(function(err,docs) {
    res.json(docs);
  });
});

// Allow a POST to add a new person object to the datastore
app.post('/people', function (req, res) {
  db.collection('users').insert({
    id_num: req.body.id_num,
    full_name: req.body.full_name,
    startDate: req.body.startDate
  });
  res.json({"message":"success"});
});


// Return the person object for the ID number supplied
app.get('/people/:userID', function (req, res) {

  db.collection('users').find({id_num:req.params['userID']}).toArray(function(err,docs) {
    if (!err && Object.keys(docs).length) {
      res.json(docs);
    }
    else {
      // If there was no user found, then send an error
      res.status(404);
      res.send("Sorry, no user with that ID found.");
    }
  });

});

// Update the person object for the ID number supplied
app.put('/people/:userID', function (req, res) {

  db.collection('users').update(
     {id_num:req.params["userID"]},
     {
       id_num: req.body.id_num,
       full_name: req.body.full_name,
       startDate: req.body.startDate
     },
     {
       upsert: false,
       multi: false
     }
  );

  res.json({message:"Ran update on DB"});

});

// Delete the person object for the ID number supplied
app.delete('/people/:userID', function (req, res) {

  db.collection('users').remove(
     {id_num : req.params["userID"]},
     true
  );

  res.json({message:"Delete command ran on database."});

});

// Return the person's name for the ID number supplied
app.get('/people/:userID/name', function (req, res) {

  db.collection('users').find({id_num:req.params['userID']}).toArray(function(err,docs) {
    if (!err && Object.keys(docs).length) {
      res.send("The user's name is: " + docs[0].full_name); // Send the name from the person's object
    }
    else {
      // If there was no user found, then send an error
      res.status(404);
      res.send("Sorry, no user with that ID found.");
    }
  });

});

// Return the number of years that a person has been at the org.
app.get('/people/:userID/years', function (req, res) {

  db.collection('users').find({id_num:req.params['userID']}).toArray(function(err,docs) {
    if (!err && Object.keys(docs).length) {
      var currentDate = new Date(); // Today's date
      var startDate = new Date(docs[0]["startDate"]); // The starting date
      var timeDifference = Math.floor((currentDate - startDate) /1000/60/60/24/365); // Take difference, convert to years
      res.send(docs[0]["full_name"] + " has been here for " + timeDifference + " years."); // Send the length of time the person has been here
      return;
    }
    else {
      // If there was no user found, then send an error
      res.status(404);
      res.send("Sorry, no user with that ID found.");
    }
  });
});

// Log some status stuff to the console
app.listen(3000, function () {
  console.log('CS336 Homework 03 app listening on port 3000!');
});
