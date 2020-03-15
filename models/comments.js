var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = Schema({
	comment: String,
	qualification: Number,
	user: { type: Schema.ObjectId, ref: 'Users'},
	place: {type: Schema.ObjectId, ref: 'Places'},
});

module.exports = mongoose.model('Comments', CommentsSchema)
