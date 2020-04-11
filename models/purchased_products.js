var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PurchasedProductsSchema = ({
    product: {type: Schema.ObjectId, ref:'Products'},
    quantity: Number
});

module.exports = mongoose.model('PurchasedProducts', PurchasedProductsSchema);