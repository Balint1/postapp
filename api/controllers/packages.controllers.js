var dbconn = require('../data/dbconnection.js'); 
var mongoose = require('mongoose');
//var Package = require('Package');
var jsonexport = require('jsonexport');
var fs = require('fs'); 
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
    //Count és offset kiszedése a query ből
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }
    //adatbáziskapcsolat nyitása
    var db = dbconn.get();
    var collection = db.collection(COLL);
    //keresőJSON kiszedése
    var detailJSON = req.body;

    console.log(detailJSON);
    var fromDate = new Date(req.body.fromDate);
    var toDate = new Date(req.body.toDate);
    //keresőJSON-ben time beállítása
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
   

    detailJSON = reformatDeailJson(detailJSON);
    detailJSON.deleted = false;
    console.log(detailJSON);
    //Összes talált package számának lekérdezése  a lapozáshoz
    var resp = {};
 
        collection
        .find(detailJSON
        ,PACKAGE_PROPERTIES)
        .sort({"time" : -1})
        .skip(offset)
        .limit(count)
        .toArray(function(err,docs){          
           resp.content = docs;           
    });

    
    setTimeout(function(){
    collection.find(detailJSON).count(function (err, count) {
        console.log("összes package : " + count);
        console.log(detailJSON);
        resp.itemCount = count;
        //console.log("Found packages",resp);
        res
        .status(200)
        .json(resp);
      });
    },200);
}

function reformatDeailJson(detailJSON)
{
    var conditions = [];
    var i = 0;
    if(detailJSON.adress && detailJSON.adress.adress){
    var addr = detailJSON.adress.adress;
    conditions[i] = {"adress.adress" : {$regex : ".*"+ addr+".*"}};
    i++;
    }
    if(detailJSON.adress && detailJSON.adress.city){
        var city = detailJSON.adress.city;
        conditions[i] = {"adress.city" : {$regex : ".*"+city+".*"}};
        i++;
    }
    if(detailJSON.adress && detailJSON.adress.zip){
        var zip = detailJSON.adress.zip;
        conditions[i] = {"adress.zip" : zip};
        i++;
    }
    if(detailJSON.admin && detailJSON.admin.id){
        var id = detailJSON.admin.id;
        conditions[i] = {"admin.id" : id};
        i++;
    }
    if(detailJSON.admin && detailJSON.admin.name){
        var name = detailJSON.admin.name;
        conditions[i] = {"admin.name" :  {$regex : ".*"+name+".*"}};
        i++;
    }
  
    conditions[i] = {};
    if(detailJSON.package_type)
    conditions[i].package_type = detailJSON.package_type;
    if(detailJSON.packageId)
    conditions[i].packageId = detailJSON.packageId;
    if(detailJSON.subject)
    conditions[i].subject =   {$regex : ".*"+detailJSON.subject+".*"} ;
    if(detailJSON.division)
    conditions[i].division = detailJSON.division ;
    if(detailJSON.package_comment)
    conditions[i].package_comment = {$regex : ".*"+detailJSON.package_comment+".*"};
    if(detailJSON.time)
    conditions[i].time = detailJSON.time;
   
    i++;
   
    
    var newJson = {$and : conditions};
   
    
  
    
    return newJson;

}


module.exports.downloadPackages = function(req,res){
    
        //adatbáziskapcsolat nyitása
        var db = dbconn.get();
        var collection = db.collection(COLL);
        
        var fromDate = new Date(req.body.fromDate);
        var toDate = new Date(req.body.toDate);
        //keresőJSON-ben time beállítása
        var detailJSON = req.body;
        console.log(detailJSON);
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
       
    
        detailJSON = reformatDeailJson(detailJSON);
        detailJSON.deleted = false;
     
            collection
            .find(detailJSON
            ,PACKAGE_PROPERTIES)
            .sort({"time" : -1})
            .limit(500)
            .toArray(function(err,docs){
                jsonexport(docs,function(err, csv){
                    if(err) return console.log(err);
                    console.log(csv);
                    
                   
                    res.setHeader('Content-disposition', 'attachment; filename=tablazat.csv');
                    res.set('Content-Type', 'text/csv');
                    res.status(200).send(csv);
                    console.log("The file was saved!");
                    }); 
    
                });
    
        
    };
