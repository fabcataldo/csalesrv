'use strict'
var Product = require('../models/products');

function saveProduct(req, res){
	var params = req.body;

	var product = new Product();
    product.description = params.description;
	product.price = params.price;
	product.place = params.place;
	product.valid_date_from = params.valid_date_from;
	product.valid_date_to = params.valid_date_to;

	product.save((err, productStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!productStored){
				res.status(404).send({message: 'No se ha guardado el producto'});
			}else{
				res.status(200).send({product: productStored});
			}
		}
	});
}

function getProduct(req, res){
	var productId = req.params.id;

	Product.findById(productId).populate({path:'place'}).exec((err, product)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!product){
				res.status(404).send({message: 'El producto no existe.'});
			}else{
				res.status(200).send({product});
			}
		}
	});
}

function getProducts(req, res){
	Product.find({}).populate({path:'place'}).exec((err, products) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!products){
				res.status(404).send({message: 'No hay productos'});
			}else{
				res.status(200).send({products});
			}
		}
	});
}

function updateProduct(req, res){
	var productId = req.params.id;
	var update = req.body;

	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!productUpdated){
				res.status(404).send({message: 'No se ha guardado el producto'});
			}else{
				res.status(200). send({product: productUpdated});
			}
		}
	});
}

function deleteProduct(req,res){
	var productId=req.params.id;

	Product.deleteOne({_id:productId}, (err, productDeleted) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el producto'});
		}else{
			res.status(200). send({product: productDeleted});
		}
	});
}

module.exports = {
	saveProduct,
	getProduct,
	getProducts,
	updateProduct,
	deleteProduct
};
