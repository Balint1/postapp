var express = require('express');
var router = express.Router();
var ctrlMails = require('../controllers/mails.controllers.js');
var ctrlPackages = require('../controllers/packages.controllers.js');
var ctrlInvoices = require('../controllers/invoices.controllers.js');
var ctrlAdmins = require('../controllers/admins.controllers.js');
var ctrlGeneral = require('../controllers/generalPackage.controllers');
var ctrlUsers = require('../controllers/users.controllers');
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
    .post(ctrlUsers.authenticate,ctrlMails.mailsPostOne);
router
    .route('/mails/:packageId')
    .get(ctrlMails.mailsGetOne)
    .put(ctrlUsers.authenticate,ctrlMails.mailsPutOne)
    .delete(ctrlMails.mailDeleteOne);
////Invoices
router
    .route('/invoices')
    .get(ctrlInvoices.invoicessGetAlll)
    .post(ctrlUsers.authenticate,ctrlInvoices.invoicePostOne);
router
    .route('/invoices/:packageId')
    .get(ctrlInvoices.invoicessGetOnee)
    .put(ctrlUsers.authenticate,ctrlInvoices.invoicePutOne)
    .delete(ctrlInvoices.invoiceDeleteOne);
////Admins
router
    .route('/admins')
    .get(ctrlAdmins.getAdmins);
module.exports = router;
////Autentication
router
    .route('/users/register')
    .post(ctrlUsers.register);
    router
    .route('/users/login')
    .post(ctrlUsers.login);