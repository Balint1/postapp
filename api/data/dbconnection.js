var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://188.142.205.191:27017/postapp';
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