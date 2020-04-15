var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketsSchema = Schema({
	date_of_purchase: {type: Date, default: Date.now},
	purchased_products: [{type: Schema.ObjectId, ref:'PurchasedProducts'}],
	payment_methods: [{type: Schema.ObjectId, ref:'PaymentMethods'}],
	total: Number
});

module.exports = mongoose.model('Tickets', TicketsSchema)
