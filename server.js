require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Passport initialization
require("./config/steam")(app);
// Add routes, both API and view
app.use(routes);
console.log(process.env.REACT_APP_REALM);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/steam-visualizer");
// Allowing deprecated command of findOneAndUpdate etc.
mongoose.set('useFindAndModify', false);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});