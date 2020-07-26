'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
const mercadopago = require('mercadopago');
const config = require('./private_resources/config');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
var app = express();

mercadopago.configure({
    client_id: config.client_id,
    client_secret: config.client_secret
});
mercadopago.configurations.setAccessToken("TEST-4810749615636979-022920-32ef3bbc2b8d5497662fe21661515b92-233164701");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit: '1mb', entended: true}));
app.use(cors())
// configurar cabeceras http
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE");
    next();
});
const limit = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: 'Too many requests' // message to send
});
app.use('/routeName', limit);
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());

// cargar rutas
var users_routes = require('./routes/users');
var tickets_routes = require('./routes/tickets');
var comments_routes = require('./routes/comments');
var privileges_routes = require('./routes/privileges');
var roles_routes = require('./routes/roles');
var products_routes = require('./routes/products');
var places_routes = require('./routes/places');
var mercadopagocheckout_routes = require('./routes/mercado_pago_checkout/mercado_pago_checkout');
var purchased_products_routes = require('./routes/purchased_products');
var available_payment_methods_routes = require('./routes/available_payment_methods');
var payment_methods_routes = require('./routes/payment_methods');

// rutas base
app.use('/api', users_routes);
app.use('/api', tickets_routes);
app.use('/api', comments_routes);
app.use('/api', privileges_routes);
app.use('/api', roles_routes);
app.use('/api', products_routes);
app.use('/api', places_routes);
app.use('/api', mercadopagocheckout_routes);
app.use('/api', purchased_products_routes);
app.use('/api', payment_methods_routes);
app.use('/api', available_payment_methods_routes);



module.exports = app;
