var quotes = require('../../db.js')

$(document).ready(function(){

  // Animate "Click something."

  $(document).on("click", function() {

  	
    $(document).css({"background-color": quotes.getElementByIndexElseRandom(colours)});
      // Update quote
      var randomQuote = quotes.getQuoteFromJSON();
      $("h1").text('“' + randomQuote.text + '”');
      $("h2").text(randomQuote.author);

      // Animate author name
      $('h2').typeIt();

    });

  	$.getJSON( "api/quote", function( data ) {
		var text = data.text;
		var author = data.author;
		$('#quote').html(text);
		$('#author').html(author);
	});

});


var quotesArray = require('../../../quotes.json')
// Colours array
var colours = ["#789dd0","#a2b3cc","#9da1b6","#7f7784","#a69190","#bf7fbf","#a3d468","#9aacb0","##294d67","#88d2f6","#5df977","#b4fb38","#ffaaaa"];