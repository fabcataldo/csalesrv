'use strict'
var Cards = require('../models/cards');
var secret = 'key_card_data';
var CryptoJS = require('crypto-js');

function encryptData(entity){
	let result = entity;
	//for(let i=0;i<entity.length;i++){
		result.card_number = CryptoJS.AES.encrypt(entity.card_number, secret).toString();
		result.expiration_date = CryptoJS.AES.encrypt(entity.expiration_date, secret).toString();
		result.user_name = CryptoJS.AES.encrypt(entity.user_name, secret).toString();
		result.user_dni = CryptoJS.AES.encrypt(entity.user_dni, secret).toString();
		result.security_code = CryptoJS.AES.encrypt(entity.security_code+'', secret).toString();
	//}
	console.log(result);
	return result;
}


function decryptData(entity){
	for(let i=0;i<entity.length;i++){
		entity[i].card_number = CryptoJS.AES.decrypt(entity[i].card_number, secret).toString(CryptoJS.enc.Utf8);
		entity[i].expiration_date = CryptoJS.AES.decrypt(entity[i].expiration_date, secret).toString(CryptoJS.enc.Utf8);
		entity[i].user_name = CryptoJS.AES.decrypt(entity[i].user_name, secret).toString(CryptoJS.enc.Utf8);
		entity[i].user_dni = CryptoJS.AES.decrypt(entity[i].user_dni, secret).toString(CryptoJS.enc.Utf8);
		entity[i].security_code = CryptoJS.AES.decrypt(entity[i].security_code, secret).toString(CryptoJS.enc.Utf8);
	}
	return entity;
}

function decryptOne(entity){
	entity._id = entity._id;
	entity.card_number = CryptoJS.AES.decrypt(entity.card_number, secret).toString(CryptoJS.enc.Utf8);
	entity.expiration_date = CryptoJS.AES.decrypt(entity.expiration_date, secret).toString(CryptoJS.enc.Utf8);
	entity.user_name = CryptoJS.AES.decrypt(entity.user_name, secret).toString(CryptoJS.enc.Utf8);
	entity.user_dni = CryptoJS.AES.decrypt(entity.user_dni, secret).toString(CryptoJS.enc.Utf8);
	entity.security_code = CryptoJS.AES.decrypt(entity.security_code, secret).toString(CryptoJS.enc.Utf8);
	
	return entity;
}

function save(req, res){
	var params = req.body;
	params = encryptData(params);

	var card = new Cards();
    card.card_number = params.card_number;
	card.expiration_date = params.expiration_date;
	card.user_name = params.user_name;
	card.user_dni = params.user_dni;
	card.security_code = params.security_code;

	card.save((err, entity) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!entity){
				res.status(404).send({message: 'No se ha guardado la tarjeta'});
			}else{
				res.status(200).send(entity);
			}
		}
	});
}

function getOne(req, res){
	var id = req.params.id;

	Cards.findById(id).exec((err, entity)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!entity){
				res.status(404).send({message: 'El producto no existe.'});
			}else{
				let result = decryptOne(entity);
				res.status(200).send(result);
			}
		}
	});
}

function getAll(req, res){
	Cards.find({}).exec((err, entities) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!entities){
				res.status(404).send({message: 'No hay tarjetas'});
			}else{
				decryptData(entities);
				res.status(200).send(entities);
			}
		}
	});
}

function update(req, res){
	var id = req.params.id;
	var entityToUpdate = req.body;
	entityToUpdate = encryptData(entityToUpdate);
	console.log(entityToUpdate)

	Cards.findByIdAndUpdate(id, entityToUpdate, (err, entity) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!entity){
				res.status(404).send({message: 'No se ha guardado la tarjeta'});
			}else{
				res.status(200). send(entity);
			}
		}
	});
}

function remove(req,res){
	var id=req.params.id;

	Cards.deleteOne({_id:id}, (err, entity) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar la tarjeta'});
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
