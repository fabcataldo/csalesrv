'use strict'

var express = require('express');
var api = express.Router();
var md_auth = require('../../middlewares/authenticated');
var MercadoPagoCheckoutController = require('../../controllers/mercado_pago_checkout/mercado_pago_checkout');

api.post('/mercadopagopayment', md_auth.ensureAuth, MercadoPagoCheckoutController.mercadoPagoPayment);

module.exports = api;