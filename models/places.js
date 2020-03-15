const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlacesSchema = Schema({
	name: String,
	address: String,
	number_of_people_enabled: Number
});

module.exports = mongoose.model('Places', PlacesSchema)
