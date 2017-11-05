var express = require('express');
var router = express.Router();
var ctrlMails = require('../controllers/mails.controllers.js');
var ctrlPackages = require('../controllers/packages.controllers.js');
var ctrlInvoices = require('../controllers/invoices.controllers.js');
var ctrlAdmins = require('../controllers/admins.controllers.js');
var ctrlGeneral = require('../controllers/generalPackage.controllers');
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
    .get(ctrlMails.mailsGetAll)
    .post(ctrlMails.mailsPostOne);
router
    .route('/mails/:packageId')
    .get(ctrlMails.mailsGetOne)
    .put(ctrlMails.mailsPutOne);
////Invoices
router
    .route('/invoices')
    .get(ctrlInvoices.invoicessGetAlll)
    .post(ctrlInvoices.invoicePostOne);
router
    .route('/invoices/:packageId')
    .get(ctrlInvoices.invoicessGetOnee)
    .put(ctrlInvoices.invoicePutOne);
////Admins
router
    .route('/admins')
    .get(ctrlAdmins.getAdmins);
module.exports = router;