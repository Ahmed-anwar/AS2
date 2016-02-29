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


app.get('/api/quote',function(req, res){
	quotes.getQuoteFromDB(function(err, quote){
		res.json(quote);
	});
});



db.connect(function(res){
	quotes.seed(function(err, seeded){
		if(seeded) console.log("seeded")
	});
});


app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});
