var dbconn = require('../data/dbconnection.js'); 
var mongoose = require('mongoose');
//var Package = require('Package');
var PACKAGE_PROPERTIES = {_id : false,
                        packageId : true,
                        subject:true,
                        package_type : true,
                        time: true,
                        adress:true,
                        division:true,
                        admin : true,
                        package_comment: true};
var COLL = 'packages';
module.exports.getPackages = function(req,res){
    var offset = 0;
    var count = 50;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }
    var db = dbconn.get();
    var collection = db.collection(COLL);

    var detailJSON = req.body;
    var fromDate = new Date(req.body.fromDate);
    var toDate = new Date(req.body.toDate);
    if(detailJSON.toDate && toDate == "Invalid Date")
        res
        .status(400)
        .send("Rossz dátum formátum a toDate-nél");
    
    else if(detailJSON.fromDate && fromDate == "Invalid Date")
        res
        .status(400)
        .send("Rossz dátum formátum a fromDate-nél");
    if(detailJSON.toDate  && detailJSON.fromDate )
        detailJSON.time = {
                $gte: new Date(req.body.fromDate),
                $lt: new Date(req.body.toDate)
            };
    else if(detailJSON.toDate  && !detailJSON.fromDate )
            detailJSON.time = {
                $lt: new Date(req.body.toDate)
            };
        else if(detailJSON.fromDate )
                detailJSON.time = {
                $gte: new Date(req.body.fromDate)
            };
    detailJSON.fromDate = undefined;
    detailJSON.toDate = undefined;
    collection
        .find(detailJSON
        ,PACKAGE_PROPERTIES)
        .skip(offset)
        .limit(count)
        .toArray(function(err,docs){
           console.log("Found packages",docs);
            res
            .status(200)
            .json(docs);
    });
}
