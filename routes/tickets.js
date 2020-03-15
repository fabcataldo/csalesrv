'use strict'

var express = require('express');
var TicketsController = require('../controllers/tickets');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/tickets', md_auth.ensureAuth, TicketsController.saveTicket);
api.get('/tickets/:id', md_auth.ensureAuth, TicketsController.getTicket);
api.put('/tickets/:id', md_auth.ensureAuth, TicketsController.updateTicket);
api.get('/tickets', md_auth.ensureAuth, TicketsController.getTickets);
api.delete('/tickets/:id', md_auth.ensureAuth, TicketsController.deleteTicket);


module.exports = api;
