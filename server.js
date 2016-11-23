var express = require('express');
var request = require('request');
var app     = express();


var port = process.argv[2] || 8082;

app.get('/scrape', function(req, res){

    //All the web scraping magic will happen here
    url = 'https://www.google.com/finance/info?q=BCBA:' + req.query.name;

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){

          var rawAnswer = html.replace('//','');

            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var answer = JSON.parse(rawAnswer);

            console.log(answer);
            res.send(answer[0].l)
        }else{
          console.log('An error was ocurred');
        }
    });

});

app.listen(port);

console.log('Listening on ' + port);

exports = module.exports = app;