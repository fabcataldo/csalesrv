var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = Schema({
	description: String,
	price: Number
});

module.exports = mongoose.model('Products', ProductsSchema)
