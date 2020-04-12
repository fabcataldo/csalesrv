var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = Schema({
	description: String,
	price: Number,
	valid_date_from: {type: Date, default: Date.now},
	valid_date_to: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Products', ProductsSchema)
