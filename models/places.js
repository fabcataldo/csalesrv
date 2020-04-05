const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlacesSchema = Schema({
	name: String,
	address: String,
	number_of_people_enabled: Number,
	lat: Number,
	lng: Number,
	tickets: [{type: Schema.ObjectId, ref: 'Tickets'}],
	comments: [{type: Schema.ObjectId, ref: 'Comments'}]
});

module.exports = mongoose.model('Places', PlacesSchema)
