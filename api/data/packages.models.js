var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    id : Number,
    name : String
});
var adressSchema = new mongoose.Schema({
    id : Number,
    adress : String,
    zip : Number
});
var packageSchema = new mongoose.Schema({
    packageId : Number,
    subject : String,
    package_type : String,
    time : Date,
    adress : [adressSchema],
    division : String,
    admin :  [adminSchema],
    package_comment : String
});

mongoose.model('Package',packageSchema);