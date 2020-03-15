var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = Schema({
	description: String,
	price: Number,
	place: { type: Schema.Types.ObjectId, ref: 'Places' }
});

module.exports = mongoose.model('Products', ProductsSchema)
