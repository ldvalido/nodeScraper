var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


var port = process.argv[2] || 8082;

app.get('/scrape', function(req, res){

    //All the web scraping magic will happen here
    url = 'http://www.imdb.com/title/tt1229340/';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    log('Requesting URL');

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){

            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);

            var json = { title : ""};

            // We'll use the unique header class as a starting point.
            log('Using cheerio');
            $("h1[itemprop]").filter(function(){

               // Let's store the data we filter into a variable so we can easily see what's going on.
               var data = $(this);

               log('Getting title text');
               // In examining the DOM we notice that the title rests within the first child element of the header tag. 
               // Utilizing jQuery we can easily navigate and get the text by writing the following code:
               var title = data.text();

               // Once we have our title, we'll store it to the our json object.
               log(title);
               res.send(title);

               json.title = title;
            });
        }else{
          log('An error was ocurred');
        }
    });

});

app.listen(port);

console.log('Listening on ' + port);

exports = module.exports = app;
function log(message) {
  console.log(message);
}