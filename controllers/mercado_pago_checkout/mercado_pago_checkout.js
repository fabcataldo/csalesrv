'use strict'
const mercadopago = require('mercadopago');
var config = require('../../private_resources/config');
var express = require('express');

// Iniialize mercadopago SDK
//mando los datos de mis credenciales (en este caso, copié las que estaban en los examples
//del payment)
mercadopago.configure({
    client_id: config.client_id,
    client_secret: config.client_secret
  });

//crea un producto de preferencia, es lo que mi negocio quiere vender
function preferenceProduct (req, res) {
// Crea un objeto de preferencia
// CAMBIAR CUANDO HAGA LA APP MOVIL, va a ser un POST
//envio el titulo del producto, cuanto sale o el price, y la cantidad (que viene de ticket)
//todo esto cuando haga el pago
var preference = {
    items: [
      {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };
  
  mercadopago.preferences.create(preference)
  .then(function(response){
  // Este valor reemplazará el string "$$init_point$$" en tu HTML
    global.init_point = response.body.init_point;

    res.status(200).send({response})    
  }).catch(function(error){
    console.log(error);
  });

}

module.exports={
  preferenceProduct
}