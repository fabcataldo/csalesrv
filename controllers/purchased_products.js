'use strict';
var PurchasedProducts = require('../models/purchased_products');

function save(req, res){
	var params = req.body;

	var purchasedProduct = new PurchasedProducts();
	purchasedProduct.product = params.product;
    purchasedProduct.ticket = params.ticket;
	purchasedProduct.quantity = params.quantity;

	purchasedProduct.save((err, entity) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!entity){
				res.status(404).send({message: 'No se ha guardado el producto comprado'});
			}else{
				res.status(200).send(entity);
			}
		}
	});
}

function getOne(req, res){
	var id = req.params.id;

	PurchasedProducts.findById(id).exec((err, entity)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!entity){
				res.status(404).send({message: 'El producto comprado no existe.'});
			}else{
				res.status(200).send(entity);
			}
		}
	});
}

function getAll(req, res){
	PurchasedProducts.find({}).exec((err, entities) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!entities){
				res.status(404).send({message: 'No hay productos comprados'});
			}else{
				res.status(200).send(entities);
			}
		}
	});
}

function update(req, res){
	var id = req.params.id;
	var update = req.body;

	PurchasedProducts.findByIdAndUpdate(id, update, (err, entity) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!entity){
				res.status(404).send({message: 'No se ha guardado el producto comprado'});
			}else{
				res.status(200). send(entity);
			}
		}
	});
}

function remove(req,res){
	var id=req.params.id;

	PurchasedProducts.deleteOne({_id:id}, (err, entity) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el producto comprado'});
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
