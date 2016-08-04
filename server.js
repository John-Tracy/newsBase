// Initialize Express and body-parser app
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 8080;
// uses any static files required by the html files.
app.use(express.static('app/public/'));

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Database configuration
var mongojs = require('mongojs');
var databaseUrl = "mongodb://heroku_2b8v8x22:e4ckvcagn9qnsk7bv7vse0mfnn@ds139725.mlab.com:39725/heroku_2b8v8x22";
// var collections = ["scrapedData"];
//  mongojs configuration to the db variable
var db = mongojs(databaseUrl);
db.on('error', function(err) {
  console.log('Database Error:', err);
});

// ROUTES
// ===========================================================
require('./app/routes/data-routes/data.js')(app, db);
require('./app/routes/html-routes/html.js')(app, db);

// Starts the server 
// =============================================================
app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});

