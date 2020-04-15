var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentMethodsSchema = Schema({
    payment_method: {type: Schema.ObjectId, ref: 'AvailablePaymentMethods'},
    //si va a ser pago en efectivo, acá debajo va a decir algo como:
    //""
    //y si es con tarjeta, va a decir el número de tarjeta
    credit_card: String,
    amount_paid: Number
});

module.exports = mongoose.model('PaymentMethods', PaymentMethodsSchema);
