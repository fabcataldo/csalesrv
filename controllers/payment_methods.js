'use strict';
var PaymentMethods = require('../models/payment_methods');

function save(req, res){
	var params = req.body;

	var paymentMethods = new PaymentMethods();
	paymentMethods.payment_method = params.payment_method;
    paymentMethods.credit_card = params.credit_card;
	paymentMethods.amount_paid = params.amount_paid;

	paymentMethods.save((err, entity) => {
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

	PaymentMethods.findById(id).populate('payment_method').exec((err, entity)=>{
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
	PaymentMethods.find({}).populate('payment_method').exec((err, entities) => {
		if(err){
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

	PaymentMethods.findByIdAndUpdate(id, update, (err, entity) => {
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

	PaymentMethods.deleteOne({_id:id}, (err, entity) => {
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
