var express = require('express');
var router = express.Router();
var ctrlMails = require('../controllers/mails.controllers.js');

router
    .route('/mails')
    .get(ctrlMails.mailsGetAll);
router
    .route('/mails/:mailId')
    .get(ctrlMails.mailsGetOne);

module.exports = router;