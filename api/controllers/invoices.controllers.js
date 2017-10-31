var dbconn = require('../data/dbconnection.js'); 
var INVOICE_PROPERTIES = {
    _id : false,packageId : true,subject:true,package_type : true , time: true,adress:true,division:true,admin : true, package_comment: true,
    invoice_number : true,sender : true,netto : true,brutto : true,expiry : true
};

module.exports.invoicessGetAll = function(req,res){
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
        .find({ "package_type": "invoice" },INVOICE_PROPERTIES)
        .skip(offset)
        .limit(count)
        .toArray(function(err,docs){
            console.log("Found invoices",docs);
            res
            .status(200)
            .json(docs);
    });

};

module.exports.invoicessGetOne = function(req,res){
    var packageId = parseInt(req.params.packageId);
    var db = dbconn.get();
    var collection = db.collection('packages');
    if(collection!= null){
    collection
        .findOne({"packageId" : packageId},INVOICE_PROPERTIES,function(err,invoice){
            if(!invoice)
            {
                res.status(404)
                    .send("Nem található ilyen számla");
                    console.log("Nem található ilyen számla packageId: ",packageId);
                    return;
            }
            else
            if(invoice.package_type != "invoice"){
            res.status(404)
                .send("Nem található ilyen számla");
                console.log("Nem található ilyen számla packageId: ",packageId);
            return;
            }
            console.log("Found invoice",invoice);
            res
            .status(200)
            .json(invoice);
    });
    }
};