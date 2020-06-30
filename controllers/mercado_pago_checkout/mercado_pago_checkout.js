'use strict'
const mercadopago = require('mercadopago');
const config = require('../../private_resources/config');
var express = require('express');


//crea un producto de preferencia, es lo que mi negocio quiere vender
function preferenceProduct(req, res) {

  // Iniialize mercadopago SDK
  //mando los datos de mis credenciales (en este caso, copié las que estaban en los examples
  //del payment)
  mercadopago.configure({
    client_id: config.client_id,
    client_secret: config.client_secret
  });

  mercadopago.configurations.setAccessToken("TEST-4810749615636979-022920-32ef3bbc2b8d5497662fe21661515b92-233164701");

  /*
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
 */

  if(req.body.payment_type == 'card'){
    var payment_data = {
      transaction_amount: req.body.transaction_amount,
      //token: 'ff8080814c11e237014c1ff593b57b4d',
      token: req.body.token,
      description: req.body.description,
      installments: 1,
      payment_method_id: req.body.payment_method_id,
      issuer_id: req.body.issuer_id,
      payer: {
        email: 'test_user_30246109@testuser.com'
      }
    };

    mercadopago.payment.save(payment_data).then(function (data) {
      console.log(data);
      res.status(200).send(data);
    }).catch(function (error) {
      console.log(error);
      res.status(500).send(error);
    });
  }
  else{
    var payment_data = {
      transaction_amount: req.body.transaction_amount,
      description: req.body.description,
      payment_method_id: req.body.payment_method_id,
      payer: {
        email: 'test_user_75767751@testuser.com'
      }
    };
    mercadopago.payment.save(payment_data).then(function (data) {
      res.status(200).send(data)
    }).catch(function (error) {
      console.log(error);
      res.status(500).send(error);
    });
  }
}

module.exports = {
  preferenceProduct
}