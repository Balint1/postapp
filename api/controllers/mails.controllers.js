var mailData = require('../data/mails.json');

module.exports.mailsGetAll = function(req,res){
    res
    .status(200)
    .json(mailData);
};
module.exports.mailsGetOne = function(req,res){
    var mailId = req.params.mailId;
    var thisMail = mailData[mailId];
    res
    .status(200)
    .json(thisMail);
};