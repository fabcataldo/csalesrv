'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/csaledb', {useNewUrlParser:true}, (err, res) => {
mongoose.connect('mongodb://csaleclouddb:colo2020@cluster-3b3jcrqp-shard-00-00.fi2b2.mongodb.net:27017,cluster-3b3jcrqp-shard-00-01.fi2b2.mongodb.net:27017,cluster-3b3jcrqp-shard-00-02.fi2b2.mongodb.net:27017/heroku_3b3jcrqp?ssl=true&replicaSet=atlas-ket7n1-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser:true}, (err, res) => {
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
