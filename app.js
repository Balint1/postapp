require('./api/data/dbconnection.js').open();
var bodyParser = require('body-parser')
//require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
app.set('port',process.env.PORT || 3000);


app.use( function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use( express.static(path.join(__dirname, 'public')));
  
app.use('/node_modules', express.static(__dirname + '/node_modules'));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json());

app.use('/api',routes);

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log('Hosted on Heroku port ' + port);
});

process.on('exit',function(){
    console.log('Bye...');
});
