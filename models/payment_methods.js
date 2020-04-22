var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentMethodsSchema = Schema({
    payment_method: {type: Schema.ObjectId, ref: 'AvailablePaymentMethods'},
    card: {type: Schema.ObjectId, ref: 'Cards'},
    amount_paid: Number
});

module.exports = mongoose.model('PaymentMethods', PaymentMethodsSchema);
