'use strict'

var express = require('express');
var UsersController = require('../controllers/users');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/users', UsersController.saveUser);
api.get('/users/:id', md_auth.ensureAuth, UsersController.getUser);
api.get('/users', md_auth.ensureAuth, UsersController.getUsers);
api.put('/users/:id', md_auth.ensureAuth, UsersController.updateUser);
api.delete('/users/:id', md_auth.ensureAuth, UsersController.deleteUser);
api.post('/login', UsersController.loginUser);
api.get('/users/ticket/:ticketId', md_auth.ensureAuth, UsersController.getClientTicket);
api.post('/users/passwordResetRequest', UsersController.passwordResetRequest);
api.post('/users/passwordReset', md_auth.ensureAuth, UsersController.passwordReset);

module.exports = api;
