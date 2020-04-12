var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PaymentMethods = require('./payment_methods');

var TicketsSchema = Schema({
	date_of_purchase: {type: Date, default: Date.now},
	purchased_products: [{type: Schema.ObjectId, ref:'PurchasedProducts'}],
	payment_methods: [PaymentMethods],
	total: Number
});

module.exports = mongoose.model('Tickets', TicketsSchema)
