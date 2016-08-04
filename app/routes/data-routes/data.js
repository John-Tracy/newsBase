

// Require request and cheerio. This makes the scraping possible
var request = require('request');
var cheerio = require('cheerio');

var path = require('path');

module.exports = function(app, db){

	function dataScraper(){
		return new Promise(function(resolved, rejected){
			request('http://www.orlandosentinel.com/sports/', function(err, res, body){
			
				var $ = cheerio.load(body);

				var title = $('a.trb_outfit_primaryItem_article_title_a').slice(0).eq(0).text();
				var link = 'http://www.orlandosentinel.com' + $('a.trb_outfit_primaryItem_article_title_a').attr('href');

				db.scrapedData.insert({
					title: title,
					link: link,
					comments: []
				});
				resolved();
			});
			
		});
	};	// end of dataScraper promise function

	app.get('/scrape', function(req, res){
		// promise that requires the request, cheerio scrape, then database insertion
		// to execute before returning success message to client.
		dataScraper().then(function(){ 
			res.json('success');
		})

	});

	app.get('/getData', function(req, res){

		// pulls data from database and uses it.
		db.scrapedData.find({}, function(err, docs){
			res.json(docs);
		})


	});

	app.post('/comment', function(req, res){

		db.scrapedData.update({_id: mongojs.ObjectId(req.body.objectId)}, {$push: {"comments": req.body.comment}});
		res.json('success');

	});

};





