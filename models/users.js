var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

var UsersSchema = new Schema({
	name: String,
	surname: String,
	email: String,
	password: String,
	loggedWithOAuth2: Boolean,
	role: { type: Schema.ObjectId, ref: 'Roles'}
});

module.exports = mongoose.model('Users', UsersSchema)
