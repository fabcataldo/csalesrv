var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RolesSchema = new Schema({
	name: String,
	privileges: [{ type: Schema.ObjectId, ref: 'Privileges'}]
});

module.exports = mongoose.model('Roles', RolesSchema)
