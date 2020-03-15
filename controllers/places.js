'use strict'
var Place = require('../models/places');
var Ticket = require('../models/tickets');
var Comment = require('../models/comments');

function savePlace(req, res){
	var params = req.body;

	var place = new Place();
    place.name= params.name;
	place.address = params.address;
	place.number_of_people_enabled = params.number_of_people_enabled;

	place.save((err, placeStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!placeStored){
				res.status(404).send({message: 'No se ha guardado el lugar'});
			}else{
				res.status(200).send({placeStored});
			}
		}
	});
}

function countTickets(req, res){
	var placeId = req.params.id;
	var validDate = req.params.validDate;

	//la consulta es: contar la cantidad de tickets que hay en la bd, según el lugar
	//que se envíe como parametro en el endpoint
	Ticket.find({place: placeId, valid_date_from: validDate}).countDocuments((err, countedTickets)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!countedTickets){
				res.status(404).send({message: 'No hay tickets comprados.'});
			}else{
				res.status(200).send({message: countedTickets});
			}
		}
	})
}

function getPlace(req, res){
	var placeId = req.params.id;

	Place.findById(placeId).exec((err, place)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!place){
				res.status(404).send({message: 'El lugar no existe.'});
			}else{
				res.status(200).send({place});
			}
		}
	});
}

function getPlaces(req, res){
	Place.find({}).exec((err, places) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!places){
				res.status(404).send({message: 'No hay lugares!'});
			}else{
				res.status(200).send({places});
			}
		}
	});
}

function updatePlace(req, res){
	var placeId = req.params.id;
	var update = req.body;

	Place.findByIdAndUpdate(placeId, update, (err, placeUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!placeUpdated){
				res.status(404).send({message: 'No se ha guardado el lugar'});
			}else{
				res.status(200). send({product: placeUpdated});
			}
		}
	});
}

function deletePlace(req,res){
	var placeId=req.params.id;

	Ticket.deleteOne({place: placeId}).exec((err, res)=>{
		if(err){
			console.log('Error en eliminar los tickets del usuario con id:'+placeId);
		}else{
			if(!res){
				console.log('No hay tickets asociados alusuario con id:'+placeId);
			}else{
				console.log('Eliminart tickets del lugar con id'+placeId+' OK');
			}
		}	
	});

	Comment.deleteOne({place: placeId}).exec((err, res)=>{
		if(err){
			console.log('Error en eliminar los comentarios del lugar con id:'+placeId);
		}else{
			if(!res){
				console.log('No hay comentarios asociados del lugar con id:'+placeId);
			}else{
				console.log('OK');
			}
		}	
	});

	Place.deleteOne({_id:placeId}, (err, placeDeleted) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el lugar'});
		}else{
			res.status(200).send({place: placeDeleted});
		}
	});
}

module.exports = {
	savePlace,
	getPlace,
	getPlaces,
	updatePlace,
	deletePlace,
	countTickets
};
