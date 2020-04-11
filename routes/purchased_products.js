'use strict'

var express = require('express');
var PurchasedProductsController = require('../controllers/purchased_products');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/purchasedProducts', md_auth.ensureAuth, PurchasedProductsController.save);
api.get('/purchasedProducts/:id', md_auth.ensureAuth, PurchasedProductsController.getOne);
api.get('/purchasedProducts', md_auth.ensureAuth, PurchasedProductsController.getAll);
api.put('/purchasedProducts/:id', md_auth.ensureAuth, PurchasedProductsController.update);
api.delete('/purchasedProducts/:id', md_auth.ensureAuth, PurchasedProductsController.remove);

module.exports = api;
