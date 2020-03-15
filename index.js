'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/csaledb', {useNewUrlParser:true}, (err, res) => {
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
