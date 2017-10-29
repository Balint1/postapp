//////////////////////////////////////////
//Howto
//legyen elindítva a mongodb server
//egy másik parancssorban : mongo
//use postapp
//db.createCollection("packages")
//egy új commandline ban elindítod a az initdb.js-t : node api\data\initdb.js (ha a projekt gyökérmappájában vagy)
//miután kiírja hogy : DB connection open azután nyomj 'ctrl + C' -t hogy leáljon a program

var packagesData = require('./packages.json');
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/postapp';
var _connection = null;
MongoClient.connect(dburl,function(err,db){
        if(err){
            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB connection open"); 
        var collection = _connection.collection('packages');
        collection.insert(packagesData);
        collection.update({packageId : {$gte: 0, $lt : 50 }},
                                        {$set : {time : new Date("2017-08-11T19:29:49Z")}},
                                        {multi : true});
        collection.update({packageId : {$gte: 50, $lt : 100 }},
                                        {$set : {time : new Date("2016-08-11T19:29:49Z")}},
                                        {multi : true});
    }
 
    );

