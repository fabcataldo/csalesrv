'use strict'
var Place = require('../models/places');
var Ticket = require('../models/tickets');
var Comment = require('../models/comments');
var url = require('url');

function savePlace(req, res){
	var params = req.body;

	var place = new Place();
    place.name= params.name;
	place.address = params.address;
	place.number_of_people_enabled = params.number_of_people_enabled;
	place.lat = params.lat;
	place.lng = params.lng;
	place.tickets = params.tickets;
	place.comments = params.comments;
	params.customer_service_days.forEach(function(item){
		place.customer_service_days.push(item);
	})

	place.save((err, placeStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!placeStored){
				res.status(404).send({message: 'No se ha guardado el lugar'});
			}else{
				res.status(200).send(placeStored);
			}
		}
	});
}

function getPlace(req, res){
	var placeId = req.params.id;

	Place.findById(placeId).populate({
		path: 'tickets', 
			populate: {
				path: 'purchased_products',
					populate: {
						path: 'products'
					}
			}
	}).populate({
		path: 'comments'
	}).exec((err, place)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!place){
				res.status(404).send({message: 'El lugar no existe.'});
			}else{
				res.status(200).send(place);
			}
		}
	});
}

function getFreeSpace(req, res){
	var placeId = req.params.id;

	Place.findById(placeId)
	.populate({
		path: 'tickets', 
		populate: {
			path: 'purchased_products',
				populate: {
					path: 'products'
				}
		}
	}).populate({
		path: 'comments'
	})
	.exec((err,result)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}
		else{
			if(!result){
				res.status(404).send({message: 'No existe el lugar!'});
			}
			else{
				let countedTickets = 0;
				if(result.tickets)
					result.tickets.forEach(function(item){
						if(item.date_of_purchase.toLocaleDateString() === new Date().toLocaleDateString()){
							countedTickets++;
						}
					})

				if(countedTickets >= result.number_of_people_enabled){
					res.status(200).send({freeSpace: false});
				}
				else{
					res.status(200).send({freeSpace: true});
				}

			}
		}
	})
}

function getPlaces(req, res){
	Place.find({}).populate({
		path: 'tickets', 
			populate: {
				path: 'purchased_products',
					populate: {
						path: 'products'
					}
			}
	}).populate({
		path: 'comments'
	})
	.exec((err, places) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!places){
				res.status(404).send({message: 'No hay lugares!'});
			}else{
				res.status(200).send(places);
			}
		}
	});
}

function updatePlace(req, res){
	var placeId = req.params.id;
	var update = req.body;

	Place.findByIdAndUpdate(placeId, update, (err, placeUpdated) => {
		if(err){
			console.log(err);
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!placeUpdated){
				res.status(404).send({message: 'No se ha guardado el lugar'});
			}else{
				res.status(200). send(placeUpdated);
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
			res.status(200).send(placeDeleted);
		}
	});
}

module.exports = {
	savePlace,
	getPlace,
	getPlaces,
	updatePlace,
	deletePlace,
	getFreeSpace
};
