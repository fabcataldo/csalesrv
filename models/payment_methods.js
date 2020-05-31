var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentMethodsSchema = Schema({
    payment_method: {type: Schema.ObjectId, ref: 'AvailablePaymentMethods'},
    amount_paid: Number
});

module.exports = mongoose.model('PaymentMethods', PaymentMethodsSchema);
