var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardsSchema = Schema({
    card_number: String,
    expiration_date: String,
    user_name: String,
    user_dni: String,
    security_code: String,
});

module.exports = mongoose.model('Cards', CardsSchema);
