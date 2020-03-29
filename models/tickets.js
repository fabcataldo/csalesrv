var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PaymentMethods = require('./payment_methods');

var TicketsSchema = Schema({
	date_of_purchase: {type: Date, default: Date.now},
	place: {type: Schema.ObjectId, ref: 'Places'},
	user: { type: Schema.ObjectId, ref: 'Users'},
	products: [{type: Schema.ObjectId, ref:'Products'}],
	payment_methods: [PaymentMethods],
	valid_date_from: {type: Date, default: Date.now},
	valid_date_to: {type: Date, default: Date.now},
	total: Number
});

module.exports = mongoose.model('Tickets', TicketsSchema)
