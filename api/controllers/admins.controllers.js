var dbconn = require('../data/dbconnection.js'); 

var ADMIN_PROPERTIES = {
                        id : true,
                        name : true,
                        _id : false
                    };
var COLL = "admins";
module.exports.getAdmins = function(req,res){
    var db = dbconn.get();
    var collection = db.collection(COLL);
    collection
        .find({},ADMIN_PROPERTIES)
        .toArray(function(err,docs){
           console.log("Found admins",docs);
            res
            .status(200)
            .json(docs);
    });
}
