var dbconn = require('../data/dbconnection.js'); 
var ctrlGeneral = require('./generalPackage.controllers.js');
//Mail tulajdonságok beállítása
var MAIL_PROPERTIES = {
    _id : false,subject:true,package_type : true , time: true,adress:true,division:true,admin : true, package_comment: true,packageId : true,
    category : true,delivery_type : true, count : true,weight : true, value : true, weight_price : true, extra_price : true
};
//Típusok beállítása
var type = ["mail","gazette","packet"];

module.exports.mailsGetAll = function(req,res){
    ctrlGeneral.generalGetAll(req,res,type,MAIL_PROPERTIES);
}

module.exports.mailsGetOne = function(req,res){
    ctrlGeneral.generalGetOne(req,res,type,MAIL_PROPERTIES);
}
module.exports.mailsPostOne = function(req,res){
    ctrlGeneral.generalPostOne(req,res,type);
}
module.exports.mailsPutOne = function(req,res){
    ctrlGeneral.generalPutOne(req,res,type);
}
module.exports.mailDeleteOne = function(req,res){
    ctrlGeneral.generalDeleteOne(req,res,type);
}