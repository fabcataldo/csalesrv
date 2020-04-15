'use strict'

var express = require('express');
var AvailablePaymentMethodsCtrl = require('../controllers/available_payment_methods');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/availablePaymentMethods', md_auth.ensureAuth, AvailablePaymentMethodsCtrl.save);
api.get('/availablePaymentMethods/:id', md_auth.ensureAuth, AvailablePaymentMethodsCtrl.getOne);
api.get('/availablePaymentMethods', md_auth.ensureAuth, AvailablePaymentMethodsCtrl.getAll);
api.put('/availablePaymentMethods/:id', md_auth.ensureAuth, AvailablePaymentMethodsCtrl.update);
api.delete('/availablePaymentMethods/:id', md_auth.ensureAuth, AvailablePaymentMethodsCtrl.remove);

module.exports = api;
