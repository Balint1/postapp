var express = require('express');
var router = express.Router();
var ctrlMails = require('../controllers/mails.controllers.js');
var ctrlPackages = require('../controllers/packages.controllers.js');
var ctrlInvoices = require('../controllers/invoices.controllers.js')
var ctrlAdmins = require('../controllers/admins.controllers.js')
///Packages
router
    .route('/packages')
    .get(ctrlPackages.getPackages);
router
    .route('/packages/search')
    .post(ctrlPackages.getPackages);
////Mails
router
    .route('/mails')
    .get(ctrlMails.mailsGetAll);
router
    .route('/mails/:mailId')
    .get(ctrlMails.mailsGetOne);
////Invoices
router
    .route('/invoices')
    .get(ctrlInvoices.invoicessGetAll);
////Admins
router
    .route('/admins')
    .get(ctrlAdmins.getAdmins);
module.exports = router;