var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

var UsersSchema = new Schema({
	name: String,
	surname: String,
	email: String,
	password: String,
	loggedWithOAuth2: Boolean,
	role: { type: Schema.ObjectId, ref: 'Roles'},
	tickets: [{type: Schema.ObjectId, ref: 'Tickets'}],
	comments: [{type: Schema.ObjectId, ref: 'Comments'}]
});

module.exports = mongoose.model('Users', UsersSchema)
