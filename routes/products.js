'use strict'

var express = require('express');
var ProductsController = require('../controllers/products');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/products', md_auth.ensureAuth, ProductsController.saveProduct);
api.get('/products/:id', md_auth.ensureAuth, ProductsController.getProduct);
api.get('/products', md_auth.ensureAuth, ProductsController.getProducts);
api.put('/products/:id', md_auth.ensureAuth, ProductsController.updateProduct);
api.delete('/products/:id', md_auth.ensureAuth, ProductsController.deleteProduct);

module.exports = api;
