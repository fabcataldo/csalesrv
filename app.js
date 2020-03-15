'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();

// cargar rutas
var users_routes = require('./routes/users');
var tickets_routes = require('./routes/tickets');
var comments_routes = require('./routes/comments');
var privileges_routes = require('./routes/privileges');
var roles_routes = require('./routes/roles');
var products_routes = require('./routes/products');
var places_routes = require('./routes/places');
var mercadopagocheckout_routes = require('./routes/mercado_pago_checkout/mercado_pago_checkout');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
// configurar cabeceras http
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE");
    next();
});


// rutas base
app.use('/api', users_routes);
app.use('/api', tickets_routes);
app.use('/api', comments_routes);
app.use('/api', privileges_routes);
app.use('/api', roles_routes);
app.use('/api', products_routes);
app.use('/api', places_routes);
app.use('/api', mercadopagocheckout_routes);


module.exports = app;
