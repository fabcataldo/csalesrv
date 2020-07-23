'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/csaledb', {useNewUrlParser:true}, (err, res) => {
mongoose.connect('mongodb://heroku_3b3jcrqp:colo,2020.@ds119052.mlab.com:19052/heroku_3b3jcrqp', {useNewUrlParser:true}, (err, res) => {
	
	if(err){
		throw err;
	}else{
		console.log("La conexión a la base de datos está funcionando correctamente...");

		app.listen(port, function(){
			console.log("Servidor del api rest de CSaleWebApi escuchando en http://localhost:"+port);
		});
	}
});

var app = require('./app');
