var express = require('express');
var request = require('sync-request');
var $ = require('cheerio');
var app     = express();
var fs = require('fs');

var port = process.argv[2] || 8082;
var rawData = fs.readFileSync('actions.js', 'utf8');

var actions = [
  {name:'fran'},
  {name:'mirg'},
  {name:'ggal'}
  ];
app.get('/scrape', function(req, res){
  var htmlOutput ='';
  for (var i = 0; i < actions.length; i++) {
    var action = actions[i];
    var answer = getPrice(action.name);
   htmlOutput += answer.name + ': ' + answer.price + '<BR/> ';
  }
  res.send(htmlOutput);
});

app.listen(port);

console.log('Listening on ' + port);

exports = module.exports = app;

function getPrice(ticket) {
    var url = 'https://www.google.com/finance/info?q=BCBA:' + ticket;
    
    var html = request('GET',url);
    var rawAnswer = html.getBody('utf8').replace('//','');
    
    var answer = JSON.parse(rawAnswer);
    var returnValue = {name: answer[0].t, price: answer[0].l};
    return returnValue;
}