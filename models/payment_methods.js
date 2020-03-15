var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentMethodsSchema = new Schema({
    name: String,
    amount_paid: Number
});

module.exports = PaymentMethodsSchema
