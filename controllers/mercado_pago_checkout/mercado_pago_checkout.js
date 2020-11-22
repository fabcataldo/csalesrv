'use strict'
const mercadopago = require('mercadopago');

function mercadoPagoPayment(req, res) {
  if(req.body.payment_type == 'card'){
    let customer = {
      email: req.body.payer_email,
      /*
      first_name: req.body.first_name,
      last_name : req.body.last_name,
      phone:{
        area_code:"023",
        number:"12345678"
      },
      identification:req.body.identification,
      description:req.body.customer_description,
      address:req.body.address
      */
    }
    mercadopago.customers.create(customer).then(function (customer) {
      card_data = {
        "token": req.body.token,
        "customer": customer.id
      }
    
      mercadopago.cards.create(card_data).then(function (card) {
        var payment_data = {
          transaction_amount: req.body.transaction_amount,
          token: req.body.token,
          description: req.body.description,
          installments: 1,
          payment_method_id: card.payment_method.id,
          payer: {
            email: req.body.payer_email
          }
        };
        if(card.payment_method.name.includes("master")){
          payment_data.issuer_id = card.issuer.id;
        }
    
        mercadopago.payment.save(payment_data).then(function (data) {
          console.log(data);
          res.status(200).send(data);
        }).catch(function (error) {
          console.log(error);
          res.status(500).send(error);
        });
      }).catch(function (error) {
       console.log(error);
       res.status(500).send(error);
      });
    
    }).catch(function (error) {
      console.log(error);
      res.status(500).send(error);
    });
  }
  else{
    //recordar que, hay que enviar el email por el body
    //acá está hardcodeado por razones de tesis
    var payment_data = {
      transaction_amount: req.body.transaction_amount,
      description: req.body.description,
      payment_method_id: req.body.payment_method_id,
      payer: {
        email: 'test_user_10166127@testuser.com'
      }
    };
    console.log('payment_Data')
    console.log(payment_data)
    mercadopago.payment.save(payment_data).then(function (data) {
      res.status(200).send(data)
    }).catch(function (error) {
      console.log(error);
      res.status(500).send(error);
    });
  }
}

module.exports = {
  mercadoPagoPayment
}