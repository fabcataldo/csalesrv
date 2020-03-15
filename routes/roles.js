'use strict'

var express = require('express');
var RolesController = require('../controllers/roles');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/roles', md_auth.ensureAuth, RolesController.saveRole);
api.get('/roles/:id', md_auth.ensureAuth, RolesController.getRole);
api.get('/roles', md_auth.ensureAuth, RolesController.getRoles);
api.put('/roles/:id', md_auth.ensureAuth, RolesController.updateRole);
api.delete('/roles/:id', md_auth.ensureAuth, RolesController.deleteRole);

module.exports = api;
