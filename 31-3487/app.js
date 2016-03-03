var express = require('express')
var app = express();
var db = require('./db.js')
var quotes = require('./quotes.js');
var index = __dirname +'/public/index.html';

app.use(express.static('public'));

app.get('/', function (req, res) {
		res.status = 200;
		res.sendFile(__dirname + '/public/index.html');

});

app.get('/index', function (req, res) {
		res.status = 200;
		res.sendFile(__dirname + '/public/index.html');

});

app.get('/index.html', function (req, res) {
		res.status = 200;
		res.sendFile(__dirname + '/public/index.html');

});

app.get('/api/quote',function(req, res){
	quotes.getQuoteFromDB(function(err, quote){
		res.json(quote);
	});
});

app.get('/api/quotes',function(req, res){
	quotes.getQuotesFromDB(function(err, quote){
		res.json(quote);
	});
});


db.connect(function(res){
	if((quotes.getQuotesFromDB.length === 0)){
		console.log("Database need to be seeded")
		db.clearDB(function(done){
			if(done) {
				console.log("Database cleared");
				quotes.seed(function(err, seeded){
				if(seeded) console.log("seeded")
		});
			}
		});
	}
	else{
		console.log("Database already seeded")
	}
	
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
