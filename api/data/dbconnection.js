var MongoClient = require('mongodb').MongoClient;
//adatbázis string
var dburl = 'mongodb://node_user:traktor@ds113746.mlab.com:13746/heroku_f9j81818';
var _connection = null;

var open = function(){
    MongoClient.connect(dburl,function(err,db){
        if(err){
            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB connection open");        
    });
    
};
var get = function(){
    return _connection;
};

module.exports = {
    open : open,
    get : get
};