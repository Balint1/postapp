var dbconn = require('../data/dbconnection.js'); 

//Új csomag felvétele
module.exports.generalPostOne = function(req,res,type){
    var db = dbconn.get();
    var collection = db.collection('packages');
    var data = req.body;
    //admint package-type-ot és division-t muszáj megadni
    if(!(data.admin && data.package_type && data.division)){
        res.status(400).send("Rossz szintaktika");
    return;
}
//Ha a package_type nem egyetzik a típussal akkor hibát jelzünk
var wrongType = true;
for(var i = 0 ; i < type.length;i++){
    if(type[i] == data.package_type)
    wrongType = false;
}
if(wrongType){
    res.status(400).send("Rossz típus! " + data.package_type)
    return;
}
//Ha nincs a time megadva, az aktuális időt használjuk
if(!data.time)
    data.time = new Date();
else    
    data.time = new Date(data.time);
    //Egyedi azonosítót generálunk
data.packageId = new Date().getTime();
//Beállítjhuk, hogy ki adta hozzá a csomagot, és hogy nincs törölt állapotban
data.user = req.user;
data.deleted = false;
//Beszúrjuk a táblázatba az adatot
collection.insertOne(data, function(err,resp){
    if (err) 
    res.status(400);
    console.log("1 document inserted : " + data.packageId);
    console.log(data);
    res.status(201).send({packageId : data.packageId});
});    
}
//A kapott packagId alapján visszaadja a keresett csomagot
module.exports.generalGetOne = function(req,res,type,PROPERTIES){
    var packageId = parseInt(req.params.packageId);
    var db = dbconn.get();
    var collection = db.collection('packages');
    if(collection!= null){
        collection
        //megkeressük a megfelelő packageId-t 
        .findOne({$and : [{"packageId" : packageId,"deleted" : false}, {$or : typeJSON(type) }]},PROPERTIES,function(err,package){
            //ha nem találtunk ilyen package-et akkor hiba
            if(!package)
            {
                res.status(404)
                .send("Nem található ilyen "+ type[0]);
                console.log("Nem található ilyen "+ type[0] +" packageId: ",packageId);
                return;
            }
            //ha megtaláltuk akkor visszaadjuk a találtat
                console.log("Found " + type,package);
                res
                .status(200)
                .json(package);
            
        });
    }
};
//Package frissítése
module.exports.generalPutOne = function(req,res,type){
    var packageId = parseInt(req.params.packageId);
    var db = dbconn.get();
    var collection = db.collection('packages');
    var data = req.body;
    console.log(req.params);
    console.log(req.body);
    //Az id-t nem lehet megváltoztatni
    if(data.packageId){
        res.status(400).send("nem tartalmazhat a body packageId-t!!");
        return;
    }
    //a kapott date stringet átalakítjuk Date objektummá
    if(data.time){
        data.time = new Date(data.time);
    }
    var query = {'packageId' : packageId};
    console.log(query);
    //frissítjuk a kívánt package-et
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
//törlés
module.exports.generalDeleteOne = function(req,res,type){
    var db = dbconn.get();
    var packageId = parseInt(req.params.packageId);
    var collection = db.collection('packages');
    console.log("delete");
    //megnézzük, hogy létezik e a törölni kívánt elem
    collection.findOne({packageId : packageId},function(err,package){
        if(package == null){
            res.status(404).json("Package doesnt exist");
            return;
        }
        //megnézzük hogy megfelelő típuson hívták-e meg
        var wrongType = true;
        for(var i = 0;i < type.length;i++){
            if(type[i] == package.package_type)
            wrongType = false;
        }if(wrongType)
        res.status(404).json("Wrong type");
        else{
            //csak logikailag törlünk, a deleted tulajdonságot true-ra állítjuk
            collection.updateOne({packageId : packageId},{$set : {deleted : true}});
            res.status(200).json("deleted");
        }
        
    });
}

//a kapott típus kapott tulajdonságait adja vissza
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
                console.log("Found "+ type+"s",docs);
                res
                .status(200)
                .json(docs);          
    });

};