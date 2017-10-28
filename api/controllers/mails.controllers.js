var dbconn = require('../data/dbconnection.js'); 
var mailData = require('../data/mails.json');
var MAIL_PROPERTIES = {
    _id : false,subject:true,package_type : true , time: true,adress:true,division:true,admin : true, package_comment: true,
    category : true,delivery_type : true, count : true,weight : true, value : true, weight_price : true, extra_price : true
};




module.exports.mailsGetAll = function(req,res){
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
        .find({$or: [ { "package_type": "mail" }, { "package_type": "gazette" },{ "package_type": "packet" } ]},MAIL_PROPERTIES)
        .skip(offset)
        .limit(count)
        .toArray(function(err,docs){
            console.log("Found mails",docs);
            res
            .status(200)
            .json(docs);
    });
    //res
    //.status(200)
    //.json(mailData);
};
module.exports.mailsGetOne = function(req,res){
    var mailId = req.params.mailId;
    var thisMail = mailData[mailId];
    res
    .status(200)
    .json(thisMail);
};