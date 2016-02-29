var quotesJSON = require('../quotes.json');
var app = require('./app.js');
var db = require('./db.js');
var DB = db.db();
var seeded = false;
var getElementByIndexElseRandom = module.exports.getElementByIndexElseRandom = function (array, index){
	if(typeof index === 'undefined'){
		index =Math.random()*(array.length)
		index= Math.floor(index)
	}
	return array[index];
}

exports.getQuotesFromJSON = function (){
	return quotesJSON;
}

exports.getQuoteFromJSON =  function (index){
	if(typeof index === 'undefined'){
		index = Math.floor(Math.random()*quotesJSON.length);
	}
	return quotesJSON[index];
}

exports.seed = function (cb){
	/** You don't need this because before coming here u grantue that the DB is connected
	if(DB === null) db.connect(function(db){
		DB = db;
		console.log(db);
	})
	**/
	if(seeded === false){
		  // calling db.db() to access the Database
			// It's not called insertAll google it :D
			db.db().collection("quotes").insertMany(quotesJSON, function(err, res){
				if(err){
					cb(err, seeded)
				}
				else{
					seeded = true;
					cb(null,seeded)
				}
		 });


	}
}

var getQuotesFromDB = module.exports.getQuotesFromDB = function(cb){
	var quotes = db.db().collection("quotes").find().toArray(function(err,quotes){
		if(err){
			cb(err,null);
		}
		else{
			cb(null,quotes);
		}
	});

}

exports.getQuoteFromDB = function(cb, index){
	getQuotesFromDB(function(err,quotes){
		if(quotes !== null){
			cb(null, getElementByIndexElseRandom(quotes,index));
		}
		else
			cb(err,null);
	});
}
