var express = require('express');
var router = express.Router();
var ctrlMails = require('../controllers/mails.controllers.js');
var ctrlPackages = require('../controllers/packages.controllers.js');
var ctrlInvoices = require('../controllers/invoices.controllers.js')

router
    .route('/packages')
    .get(ctrlPackages.packagesGetAll);
router
    .route('/mails')
    .get(ctrlMails.mailsGetAll);
router
    .route('/mails/:mailId')
    .get(ctrlMails.mailsGetOne);
router
    .route('/invoices')
    .get(ctrlInvoices.invoicessGetAll);

module.exports = router;