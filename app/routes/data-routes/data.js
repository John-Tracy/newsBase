// Database configuration
//var mongojs = require('mongojs');
//var databaseUrl = "newsScraper";
//var collections = ["scrapedData"];
// Hook mongojs configuration to the db variable
//var db = mongojs(databaseUrl, collections);
//db.on('error', function(err) {
//  console.log('Database Error:', err);
//});

// Require request and cheerio. This makes the scraping possible
var request = require('request');
var cheerio = require('cheerio');

var path = require('path');

module.exports = function(app){


};