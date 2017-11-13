var dbconn = require('../data/dbconnection.js'); 

module.exports.generalGetAll = function(req,res,type,PROPERTIES){
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
    if(collection!= null)
    collection
        .find({ $or: typeJSON(type) },PROPERTIES)
        .skip(offset)
        .limit(count)
        .toArray(function(err,docs){
            if(docs.deleted){
                res.status(404).json("Nem található ilyen számla");
            }else {
                console.log("Found "+ type+"s",docs);
                res
                .status(200)
                .json(docs);    
            }
            
    });

};

module.exports.generalPostOne = function(req,res,type){
var db = dbconn.get();
var collection = db.collection('packages');
var data = req.body;
if(!(data.admin && data.package_type && data.division)){
    res.status(400).send("Rossz szintaktika");
    return;
}
var wrongType = true;
for(var i = 0 ; i < type.length;i++){
    if(type[i] == data.package_type)
    wrongType = false;
}
if(wrongType){
    res.status(400).send("Rossz típus! " + data.package_type)
    return;
}
if(!data.time)
data.time = new Date();
data.packageId = new Date().getTime();
data.user = req.user;
collection.insertOne(data, function(err,resp){
if (err) 
res.status(400);
console.log("1 document inserted : " + data.packageId);
console.log(data);
res.status(201).send({packageId : data.packageId});
});    
}

module.exports.generalGetOne = function(req,res,type,PROPERTIES){
    var packageId = parseInt(req.params.packageId);
    var db = dbconn.get();
    var collection = db.collection('packages');
    if(collection!= null){
    collection
        .findOne({$and : [{"packageId" : packageId}, {$or : typeJSON(type) }]},PROPERTIES,function(err,invoice){
            if(!invoice)
            {
                
                res.status(404)
                    .send("Nem található ilyen "+ type[0]);
                    console.log("Nem található ilyen "+ type[0] +" packageId: ",packageId);
                    return;
            }
            if(invoice.deleted){
                res.status(404).json("Nem található ilyen számla");
            }else {
            console.log("Found " + type,invoice);
            res
            .status(200)
            .json(invoice);
            }
    });
    }
};


module.exports.generalPutOne = function(req,res,type){
    var packageId = parseInt(req.params.packageId);
    var db = dbconn.get();
    var collection = db.collection('packages');
    var data = req.body;
    console.log(req.params);
    if(data.packageId){
        res.status(400).send("nem tartalmazhat a body packageId-t!!");
        return;
    }
    /*var wrongType = true;
    for(var i = 0 ; i < type.length;i++){
        if(type[i] == data.package_type)
        wrongType = false;
    }
    if(wrongType){
        res.status(400).send("Rossz típus! " + data.package_type)
        return;
    }*/
    var query = {'packageId' : packageId};
    console.log(query);
    collection.updateOne(query,{$set: data}, function(err,resp){
    if (err) 
    res.status(400);
    console.log("updated packages  : " + resp);
    res.status(204).send(data);
    });  
    }

function typeJSON(type){
    var typeJson = [];
    for(var i = 0 ; i < type.length;i++)
    {
        typeJson[i] = {package_type : type[i]};
    }
    console.log(typeJson);
    return typeJson;
}
