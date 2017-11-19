var dbconn = require('../data/dbconnection.js'); 
var ctrlGeneral = require('./generalPackage.controllers.js');
var INVOICE_PROPERTIES = {
    _id : false,packageId : true,subject:true,package_type : true , time: true,adress:true,division:true,admin : true, package_comment: true,
    invoice_number : true,sender : true,netto : true,brutto : true,expiry : true
};
var type = ["invoice"];

module.exports.invoicessGetAlll = function(req,res){
    ctrlGeneral.generalGetAll(req,res,type,INVOICE_PROPERTIES);
}

module.exports.invoicessGetOnee = function(req,res){
    ctrlGeneral.generalGetOne(req,res,type,INVOICE_PROPERTIES);
}
module.exports.invoicePostOne = function(req,res){
    ctrlGeneral.generalPostOne(req,res,type);
}
module.exports.invoicePutOne = function(req,res){
    ctrlGeneral.generalPutOne(req,res,type);
}
module.exports.invoiceDeleteOne = function(req,res){
    ctrlGeneral.generalDeleteOne(req,res,type);
}