var dbconn = require('../data/dbconnection.js'); 
var PACKAGE_PROPERTIES = {_id : false,subject:true,time: true,adress:true,division:true,admin : true};
module.exports.packagesGetAll = function(req,res){
    var offset = 0;
    var count = 50;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }
    var db = dbconn.get();
    var collection = db.collection('packages');
    collection
        .find({},PACKAGE_PROPERTIES)
        .skip(offset)
        .limit(count)
        .toArray(function(err,docs){
            console.log("Found packages",docs);
            res
            .status(200)
            .json(docs);
    });
}