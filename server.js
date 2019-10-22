// Requiring Database Packages
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
// Axios and Cheerio for scraping
const axios = require("axios");
const cheerio = require("cheerio");

// Require Models folder for database
const db = require("./models");

// Set Port
const PORT = 3000;

// Initializing Express
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));
// Seting Up Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });