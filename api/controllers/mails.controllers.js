var mailData = require('../data/mails.json');

module.exports.mailsGetAll = function(req,res){
    console.log('GET the hotels');
    res
    .status(200)
    .json(mailData);
};
module.exports.mailsGetOne = function(req,res){
    var mailId = req.params.mailId;
    console.log('GET mailId', mailId);
    var thisMail = mailData[mailId];
    res
    .status(200)
    .json(thisMail);
};