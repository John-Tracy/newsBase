// Database configuration
var mongojs = require('mongojs');
var databaseUrl = "newsScraper";
var collections = ["scrapedData"];
// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});

// Require request and cheerio. This makes the scraping possible
var request = require('request');
var cheerio = require('cheerio');

var path = require('path');

module.exports = function(app, db){

	app.get('/scrape', function(req, res){

		request('http://www.orlandosentinel.com/sports/', function(err, res, body){
			console.log('happening?');
			var $ = cheerio.load(body);

			var title = $('a.trb_outfit_primaryItem_article_title_a').slice(0).eq(0).text();
			var link = 'http://www.orlandosentinel.com' + $('a.trb_outfit_primaryItem_article_title_a').attr('href');
			
			console.log(title);
			console.log(link);
		});	
	
	});

};