'use strict';
var AvailablePaymentMethods = require('../models/available_payment_methods');

function save(req, res){
	var params = req.body;

	var availablePaymentMethods = new AvailablePaymentMethods();
	availablePaymentMethods.name = params.name;

	availablePaymentMethods.save((err, entity) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!entity){
				res.status(404).send({message: 'No se ha guardado el método de pago'});
			}else{
				res.status(200).send(entity);
			}
		}
	});
}

function getOne(req, res){
	var id = req.params.id;

	AvailablePaymentMethods.findById(id).exec((err, entity)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!entity){
				res.status(404).send({message: 'El método de pago no existe.'});
			}else{
				res.status(200).send(entity);
			}
		}
	});
}

function getAll(req, res){
	AvailablePaymentMethods.find({}).exec((err, entities) => {
		if(err){
			console.log(err);
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!entities){
				res.status(404).send({message: 'No hay métodos de pago'});
			}else{
				res.status(200).send(entities);
			}
		}
	});
}

function update(req, res){
	var id = req.params.id;
	var update = req.body;

	AvailablePaymentMethods.findByIdAndUpdate(id, update, (err, entity) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!entity){
				res.status(404).send({message: 'No se ha actualizado el método de pago'});
			}else{
				res.status(200). send(entity);
			}
		}
	});
}

function remove(req,res){
	var id=req.params.id;

	AvailablePaymentMethods.deleteOne({_id:id}, (err, entity) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el método de pago'});
		}else{
			res.status(200). send(entity);
		}
	});
}

module.exports = {
	save,
	getOne,
	getAll,
	update,
	remove
};
