var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvailablePaymentMethodsSchema = Schema({
    name: String
});

module.exports = mongoose.model('AvailablePaymentMethods', AvailablePaymentMethodsSchema);