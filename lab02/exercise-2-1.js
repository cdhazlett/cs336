// Exercise 2.1 and 2.2 for cs336
// A person class written in Javascript, ES5 style
// and a Student class that inherits from it
// @author: Christiaan Hazlett (cdh24)
// Date: 9-14-16

// Person class models/objectifies a person
function Person(name, birthdate, list_friends) {

  // Name
  if (typeof(name) == "string") {
    this.name = name;
  }
  else {
    throw "Error: name is not a string."
  }

  // Birthdate
  if (birthdate instanceof Date) {
    this.birthdate = birthdate;
  }
  else {
    throw "Error: date is not a Date object."
  }

  // Friends
  this.friends = list_friends;  // TODO: add check for friend objects in list
                                // The problem here is with using the 'this' keyword
                                // inside of a forEach loop callback function.
                                // For some reason, it comes up as undefined.
                                // I'm going to ask about this in class.
                                // EDIT: learned why this is a problem, decided
                                // I don't really need to check for it after all. :)
}

// say_greeting() prints the name of the person and a friendly greeting
Person.prototype.say_greeting = function () {
  console.log(this.name + " says: Hello, I'm a person!");
}

// get_age() computes and returns the age of the person
Person.prototype.get_age = function () {
  var today = new Date();
  var birthDate = new Date(this.birthdate);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  // console.log(age);
  return(age);
}

// get_name() returns the person's name
Person.prototype.get_name = function () {
  return this.name;
}

// get_friends() prints a list of the person's friends
Person.prototype.get_friends = function () {
  // this.friends.forEach(function (currentValue, index, array) {
  //   console.log("This person has these friends:");
  //   console.log("\t" + currentValue.get_name());
  // });
  return(this.friends);
}

// Mutators

//change_name(string name) changes the name of the person
Person.prototype.change_name = function (name) {
  if (typeof(name) == "string") {
    this.name = name;
  }
  else {
    throw "change_name(string name) operation failed. Name is not a string."
  }
}

//change_birthdate(Date date) changes the birthday of the person
Person.prototype.change_birthdate = function (date) {
  if (date instanceof Date) {
    this.birthdate = date;
  }
  else {
    throw "change_birthdate(Date date) operation failed. date is not a Date object."
  }
}

//add_friend(person friend) adds a friend to the list of friends
Person.prototype.add_friend = function (friend) {
  if (friend instanceof Person) {
    this.friends.push(friend);
  }
  else {
    throw "add_friend(friend) operation failed. friend is not a Person type."
  }
}

///////////
// Tests //
///////////

// Test creating a new person
var christiaan = new Person("Christiaan", new Date("02/04/1996"), []);

christiaan.say_greeting(); // Christiaan says: Hello, I'm a person!
console.log("Christiaan's age is: " + christiaan.get_age()); // 20

// Test changing the name
christiaan.change_name("Christiaan Duesenberg Hazlett");
// Change the birthdate, see if I am now 21
christiaan.change_birthdate(new Date("09/14/1995")); // 21 as of lab time
console.log(christiaan.get_age()); // 21

// Try the greeting again
christiaan.say_greeting(); // Christiaan Duesenberg Hazlett says: Hello, I'm a person!

// Add a friend.  I only have a couple. :(
var p1 = new Person("Christiaan", new Date("02/04/1996"), []);
p1.add_friend(new Person("Drew", new Date("01/01/1996"), [p1]));
p1.add_friend(new Person("Nate", new Date("01/01/1995"), [p1]));
p1.add_friend(new Person("Frank", new Date("04/06/1996"), [p1]));
console.log(p1.get_friends()); // This person has these friends: Drew


//////////////////
// Exercise 2.2 //
//////////////////

console.log("\n\n---Exercise 2.2---\n\n");

// This creates a Student class which inherits from the Person class
function Student (name, birthdate, list_friends, field_of_study) {
  Person.call(this, name, birthdate, list_friends);

  if (typeof(field_of_study) == "string") {
    this.field_of_study = field_of_study;
  }
  else {
    throw "Error: field is not a string."
  }
}

// Inherit the Person class
Student.prototype = Object.create(Person.prototype);

//change_field(string name) changes the field of study of the student
Student.prototype.change_field = function (field) {
  if (typeof(field) == "string") {
    this.field_of_study = field;
  }
  else {
    throw "change_field(string field) operation failed. field is not a string."
  }
}

// get_field_of_study() returns the name of the field of study of the student
Student.prototype.get_field_of_study = function() {
  return(this.name + " is studying " + this.field_of_study);
}

// say_greeting() prints the name of the person and a friendly greeting
Student.prototype.say_greeting = function () {
  console.log(this.name + " says: Hello, I'm a student!");
}

var s1 = new Student("Christiaan", new Date("02/04/1996"), [], "Computer Science/Business");

///////////
// Tests //
///////////

s1.say_greeting(); // Christiaan says: Hello, I'm a student!
console.log(s1.get_age()); // 20
s1.get_field_of_study(); //Christiaan is studying Computer Science/Business
