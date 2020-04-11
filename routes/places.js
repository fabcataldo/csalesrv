'use strict'

var express = require('express');
var PlacesController = require('../controllers/places');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/places/:id', md_auth.ensureAuth, PlacesController.getPlace);
api.get('/places', md_auth.ensureAuth, PlacesController.getPlaces);
api.post('/places', md_auth.ensureAuth, PlacesController.savePlace);
api.put('/places/:id', md_auth.ensureAuth, PlacesController.updatePlace);
api.delete('/places/:id', md_auth.ensureAuth, PlacesController.deletePlace);
api.get('/places/freeSpace/:id', md_auth.ensureAuth, PlacesController.getFreeSpace);


module.exports = api;
