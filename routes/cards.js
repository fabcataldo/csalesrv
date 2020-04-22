'use strict'

var express = require('express');
var CardsController = require('../controllers/cards');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/cards', md_auth.ensureAuth, CardsController.save);
api.get('/cards/:id', md_auth.ensureAuth, CardsController.getOne);
api.get('/cards', md_auth.ensureAuth, CardsController.getAll);
api.put('/cards/:id', md_auth.ensureAuth, CardsController.update);
api.delete('/cards/:id', md_auth.ensureAuth, CardsController.remove);

module.exports = api;
