//////////////////////////////////////////
//Howto
//legyen elindítva a mongodb server
//egy másik parancssorban : mongo
//use postapp
//db.createCollection("packages")
//db.createCollection("admins")
//db.createCollection("users")
//ha már egyszer létrehoztad ezeket akkor csak az utolsó lépés kell:
//egy új commandline ban elindítod a az initdb.js-t : node api\data\initdb.js (ha a projekt gyökérmappájában vagy)

var packagesData = require('./packages.json');
var MongoClient = require('mongodb').MongoClient;
var dburl =  'mongodb://node_user:traktor@ds113746.mlab.com:13746/heroku_f9j81818';
var _connection = null;
MongoClient.connect(dburl,function(err,db){
        if(err){
            console.log("DB connection failed");
            return;
        }
        _connection = db;
        console.log("DB connection open"); 
        var packages = _connection.collection('packages');
        var admins = _connection.collection('admins');
        var users = _connection.collection('users');
        packages.remove({});
        admins.remove({});
        users.remove({});
        packages.insert(packagesData);
        admins.insert([ { id: 1, name: 'Jancsi' },
        { id: 2, name: 'Peti' },
        { id: 3, name: 'Klára' },
        { id: 4, name: 'Lilla' } ]);
        
        packages.update({packageId : {$gte: 0, $lt : 50 }},
                                        {$set : {time : new Date("2017-08-11T19:29:49Z")}},
                                        {multi : true});
                                        packages.update({packageId : {$gte: 50, $lt : 100 }},
                                        {$set : {time : new Date("2016-08-11T19:29:49Z")}},
                                        {multi : true});
        packages.update({packageId : {$gte: 0, $lt : 50 }},
                                        {$set : {invoice_number : "AB45F54KD"}},
                                        {multi : true});
                                        packages.update({packageId : {$gte: 50, $lt : 100 }},
                                        {$set : {invoice_number :"CHKL43HZT12F"}},
                                        {multi : true});
        packages.update({"admin.name" : "Jancsi"},{$set :{"admin.id" : 1}},{multi : true});
        packages.update({"admin.name" : "Peti"},{$set :{"admin.id" : 2}},{multi : true});
        packages.update({"admin.name" : "Klára"},{$set :{"admin.id" : 3}},{multi : true});
        packages.update({"admin.name" : "Lilla"},{$set :{"admin.id" : 4}},{multi : true});

      
        users.insert({"username" : "admin","password" : "$2a$10$.QE1Pitq9kuaMpqbarQqm.CHHDkG.v7.SBSpm4LEUJ6m/LMFc2ORq"});
        packages.update({},{$set : {deleted : false}},{multi : true});
        db.close();
    }
 
    );
