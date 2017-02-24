// Dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


// Using es6 promise
mongoose.Promise = Promise;

// Initialize Express
var app = express();
var PORT = process.env.PORT || 8000;

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// allow handlesbars engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
// Now set handlebars engine
app.set('view engine', 'handlebars');

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/newsScraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log("Mongoose connection successful.");
});

// Require the routes in controllers
require("./controllers/articlesController.js")(app);

//Listen on PORT 8000
app.listen(8000, function() {
  console.log("App running on port 3000!");
});