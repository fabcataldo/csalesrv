'use strict'

var express = require('express');
var PaymentMethodsController = require('../controllers/payment_methods');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/paymentMethods', md_auth.ensureAuth, PaymentMethodsController.save);
api.get('/paymentMethods/:id', md_auth.ensureAuth, PaymentMethodsController.getOne);
api.get('/paymentMethods', md_auth.ensureAuth, PaymentMethodsController.getAll);
api.put('/paymentMethods/:id', md_auth.ensureAuth, PaymentMethodsController.update);
api.delete('/paymentMethods/:id', md_auth.ensureAuth, PaymentMethodsController.remove);

module.exports = api;
