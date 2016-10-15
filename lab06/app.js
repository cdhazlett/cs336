/*
  Lab06 for CS336
  date: 10-14-16
  author: Christiaan Hazlett
*/

// GET curl: curl -X GET localhost:3000/request
// POST curl: curl -X POST localhost:3000/request -d '{"arg":"This is a POST"}' -H 'Content-Type: application/json'
// PUT curl: curl -X PUT localhost:3000/request -d '{"arg":"This is a PUT"}' -H 'Content-Type: application/json'
// HEAD curl: curl -I localhost:3000/request
// DELETE curl: curl -X DELETE localhost:3000/request -d '{"arg":"A string on the server"}' -H 'Content-Type: application/json'

// Exercise 6.1 Answers
// a. CURL lets you test all of the HTTP methods (see above for commands).
// Chrome is able to test the GET and POST (via forms) methods.  You can also
// infer the response a HEAD request would get with the developer tools.  But,
// a Chrome extension called POSTman allows you to test all the methods, and will
// even generate CURL syntax that can be copied and used elsewhere.
//
// b. The best response code for an undefined route is 404 NOT FOUND.  Since the
// route doesn't exist, the server is not able to find the requested resource.

// Exercise 6.2 Answers
// a. HTML forms can send data via a POST request, or by attaching the data
// onto the end of the URL in a GET request.
// b. The data is passed back to the server as key-value pairs.  The data may be
// modified to correct formatting or html entity problems, etc

var express = require('express');
var app = express();
var HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Init the body and cookie parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Create a data store for the stuff received by POST and PUT
// Also give it some deafult values
var dataStore = ["some test", "data here"];

// Static file routes
app.use(express.static('static'));

// POST route for /forms.  This will accept the form data and send it back in text.
app.post('/forms', function(req, res){
  res.status(HttpStatus.ACCEPTED);
  res.header("Content-Type", "text/plain");
  res.send("Form data:\n\nName: " + req.body.user_name + "\nEmail: " + req.body.user_email + "\n\nMessage:\n\n" + req.body.user_message);
});


// This GET route returns the data that is in the data store
app.get('/request', function (req, res) {
  // This request sends the data store as a json object to the browser
  res.status(HttpStatus.OK);
  res.json(dataStore);
});

// This HEAD route only returns the headers of the data store page
app.head('/request', function (req, res) {
  // Purpose of this method is to not send the body of the request, but only the
  // head of the document.  In this case, that's just the status of 200 OK
  res.status(HttpStatus.OK);
  res.end();
});

// This POST route accepts JSON and stores it into the data store
app.post('/request', function (req, res) {
  // The purpose of this method is to accept data from a browser.  The server
  // responds with a 202 ACCEPTED if the data is accepted, and the data string is added
  // to the data store variable.
  dataStore.push(req.body.arg);
  res.status(HttpStatus.ACCEPTED);
  res.end();
});

// This PUT route accepts JSON and stores it into the data store
app.put('/request', function (req, res) {
  // The purpose of this method is to accept data from a browser (usually just
  // for updating purposes).  The server responds with a 200 OK if the data is
  // accepted, and the data string is added to the data store variable.
  dataStore.push(req.body.arg);
  res.status(HttpStatus.OK);
  res.end();
});

// This DELETE route allows the user to delete strings from the data store
app.delete('/request', function (req, res) {

  dataStore.splice(dataStore.indexOf(req.body.arg),1);
  res.status(HttpStatus.ACCEPTED);
  res.end();
});

// This is the default fall-back route for any URLs not defined here
app.all('*', function (req, res) {
  res.status(HttpStatus.NOT_FOUND);
  res.send("Nothing at this address.");
});

// Start the Express server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
