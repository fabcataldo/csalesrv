'use strict'

var express = require('express');
var PrivilegesController = require('../controllers/privileges');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/privileges', md_auth.ensureAuth, PrivilegesController.getPrivileges);
api.get('/privileges/:id', md_auth.ensureAuth, PrivilegesController.getPrivilege);
api.put('/privileges/:id', md_auth.ensureAuth, PrivilegesController.updatePrivilege);
api.post('/privileges', md_auth.ensureAuth, PrivilegesController.savePrivilege);
api.delete('/privileges/:id', md_auth.ensureAuth, PrivilegesController.deletePrivilege);

module.exports = api;
