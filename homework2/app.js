// CS 336 Homework 02
// Author: Christiaan Hazlett
// Date: 10-28-16

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Init the body and cookie parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static file routes
app.use(express.static('public'));

// Make a sample data structure to hold our person objects
var myDataStructure = [
  {
    "id_num" : "100",
    "fullName" : "Christiaan Hazlett",
    "startDate" : "8-31-2014"
  },
  {
    "id_num" : "101",
    "fullName" : "Drew Vande Lune",
    "startDate" : "9-5-2014"
  },
  {
    "id_num" : "102",
    "fullName" : "Nate Bender",
    "startDate" : "7-4-2013"
  },
  {
    "id_num" : "103",
    "fullName" : "David Hartwell",
    "startDate" : "7-8-2005"
  }
]

// Deafult homepage text
app.get('/', function (req, res) {
  res.send('Hello.  Use /people, /people/id, /people/id/name, or /people/id/years to view stuff.');
});

// Simply return the entire data structure as JSON
app.get('/people', function (req, res) {
  res.json(myDataStructure);
});

// Allow a POST to add a new person object to the datastore
app.post('/people', function (req, res) {

  // Append the new person to the datastructure
  myDataStructure.push({
    "id_num" : req.body.id_num,
    "fullName" : req.body.fullName,
    "startDate" : req.body.startDate
  });

  res.json(myDataStructure);
});


// Return the person object for the ID number supplied
app.get('/people/:userID', function (req, res) {

  // Search through the data structure to find the user with the ID
  var counter = 0;
  while(counter < myDataStructure.length)
  {
    if (myDataStructure[counter]["id_num"] == req.params["userID"])
    {
      res.json(myDataStructure[counter]); // Send the JSON of the user's object
      return;
    }
    counter++;
  }

  // If there was no user found, then send an error
  res.status(404);
  res.send("Sorry, no user with that ID found.");

});

// Update the person object for the ID number supplied
app.put('/people/:userID', function (req, res) {

  // Search through the data structure to find the user with the ID
  var counter = 0;
  while(counter < myDataStructure.length)
  {
    if (myDataStructure[counter]["id_num"] == req.params["userID"])
    {

      // Update the person record in the datastructure
      myDataStructure[counter] = {
        "id_num" : req.body.id_num,
        "fullName" : req.body.name,
        "startDate" : req.body.startDate
      };

      res.json(myDataStructure[counter]); // Send the JSON of the user's object
      return;
    }
    counter++;
  }

  // If there was no user found, then send an error
  res.status(404);
  res.send("Sorry, no user with that ID found.");

});

// Delete the person object for the ID number supplied
app.delete('/people/:userID', function (req, res) {

  // Search through the data structure to find the user with the ID
  var counter = 0;
  while(counter < myDataStructure.length)
  {
    if (myDataStructure[counter]["id_num"] == req.params["userID"])
    {

      myDataStructure.splice(counter, 1);
      res.json(myDataStructure); // Send the JSON of the user object
      return;
    }
    counter++;
  }

  // If there was no user found, then send an error
  res.status(404);
  res.send("Sorry, no user with that ID found.");

});

// Return the person's name for the ID number supplied
app.get('/people/:userID/name', function (req, res) {

  // Search through the data structure to find the user with the ID
  var counter = 0;
  while(counter < myDataStructure.length)
  {
    if (myDataStructure[counter]["id_num"] == req.params["userID"])
    {
      res.send("The user's name is: " + myDataStructure[counter]["fullName"]); // Send the name from the person's object
      return;
    }
    counter++;
  }

  // If there was no user found, then send an error
  res.status(404);
  res.send("Sorry, no user with that ID found.");

});

// Return the number of years that a person has been at the org.
app.get('/people/:userID/years', function (req, res) {

  // Search through the data structure to find the user with the ID
  var counter = 0;
  while(counter < myDataStructure.length)
  {
    if (myDataStructure[counter]["id_num"] == req.params["userID"])
    {
      // Do some calculations to determine the length of time the person
      // has been here.
      var currentDate = new Date(); // Today's date
      var startDate = new Date(myDataStructure[counter]["startDate"]); // The starting date
      var timeDifference = Math.floor((currentDate - startDate) /1000/60/60/24/365); // Take difference, convert to years
      res.send(myDataStructure[counter]["fullName"] + " has been here for " + timeDifference + " years."); // Send the length of time the person has been here
      return;
    }
    counter++;
  }

  // If there was no user found, then send an error
  res.status(404);
  res.send("Sorry, no user with that ID found.");

});

// Log some status stuff to the console
app.listen(3000, function () {
  console.log('CS336 Homework 02 app listening on port 3000!');
});
