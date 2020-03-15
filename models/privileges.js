const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrivilegesSchema = Schema({
	name: String,
	description: String
});

module.exports = mongoose.model('Privileges', PrivilegesSchema)
