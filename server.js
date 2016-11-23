var express = require('express');
var request = require('request');
var app     = express();
var fs = require('fs')

var port = process.argv[2] || 8082;
var actions = actions = fs.readFileSync('actions.js', 'utf8');

app.get('/scrape', function(req, res){
  for (var i= 0; i <actions.length; i ++) {
    var action = actions[i];
    //All the web scraping magic will happen here
    url = 'https://www.google.com/finance/info?q=BCBA:' + action.name;

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    request(url, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request
        if(!error){
          console.log(url);
          console.log(html);
          var rawAnswer = html.replace('//','');
            console.log(rawAnswer);
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var answer = JSON.parse(rawAnswer);
            res.send(answer[0].l)
        }else{
          console.log('An error was ocurred');
        }
    });
  }

    
});

app.listen(port);

console.log('Listening on ' + port);

exports = module.exports = app;