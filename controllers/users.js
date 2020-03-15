'use strict'
var User = require('../models/users');
var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');
var Ticket = require('../models/tickets');
var Comment = require('../models/comments');
var Role = require('../models/roles');

function makeRandomString(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}


function recUser(user, res){
	user.save((err, userStored) => {
		if (err) {
			res.status(500).send({ message: 'Error en el servidor' });
		} else {
			if (!userStored) {
				res.status(404).send({ message: 'No se ha guardado el usuario' });
			} else {
				res.status(200).send({ 
					user: userStored,
					token: jwt.createToken(user)
				});
			}
		}
	});	
}

function recClientUser(user, res){
	Role.findOne({ name: 'cliente' }).populate({ path: 'privileges' }).exec((err, role) => {
		if (err) {
			res.status(500).send('Error en la petición get Role');
		} else {
			if (!role) {
				res.status(404).send('El rol no existe.');
			} else {
				user.role = role;
				recUser(user, res);
			}
		}
	});
}


async function saveUser(req, res){
	var user = new User();
	var params = req.body;	

	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.password = params.password;
	user.role = params.role;
	user.loggedWithOAuth2 = params.loggedWithOAuth2;

	if(user==null){
		console.log(user)
		res.status(200).send({message: 'Rellena todos los campos'});
	}
	else{
		User.findOne({email: user.email.toLowerCase()}, (err, userResult) => {
			if(err){
				res.status(500).send(err)
			}
			else{
				if(!userResult){
					if (user.password) {
						bcrypt.hash(user.password, null, null, function (err, hash) {
							user.password = hash;
						})
					}
					else {
						if (!user.loggedWithOAuth2) {
							res.status(400).send({ message: 'Introduce la contraseña' });
						}
						else {
							bcrypt.hash(makeRandomString(user.email.length), null, null, function (err, hash) {
								user.password = hash;
							})					
						}
					}
					if (!user.role){
						Role.findOne({ name: 'cliente' }).populate({ path: 'privileges' }).exec((err, role) => {
							if (err) {
								res.status(500).send('Error en la petición get Role');
							} else {
								if (!role) {
									res.status(404).send('El rol no existe.');
								} else {
									recClientUser(user, res);
								}
							}
						});
					}
					else{
						recUser(user,res);
					}
				}
				else{
					res.status(200).send({user: userResult, 
						token: jwt.createToken(userResult)
					});
				}
			}
		})
	}
}

function loginUser(req, res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase(), loggedWithOAuth2: false}, (err, user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición login user'});
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe o es una cuenta de Google o Facebook.'});
			}else{
				// Comprobar la contraseña
				bcrypt.compare(password, user.password, function(err, check){
					if(check){
						//devolver los datos del usuario logueado
						res.status(200).send({
							user: user,
							token: jwt.createToken(user)
						});
					}else{
						res.status(404).send({message: 'El usuario no ha podido loguease'});
					}
				});
			}
		}
	});
}

function getUser(req, res){
	var userId = req.params.id;

	User.findById(userId).populate({path: 'role', populate : {path : 'privileges'}}).exec((err, user)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición getUser '});
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe.'});
			}else{
				res.status(200).send({user});
			}
		}
	});
}

function getUsers(req, res){
	User.find({}).populate({path: 'role', populate : {path : 'privileges'}}).exec((err, users) => {
		if(err){
			res.status(500).send({message: 'Error en la petición get Users'});
		}else{
			if(!users){
				res.status(404).send({message: 'No hay usuarios'});
			}else{
				res.status(200).send({users});
			}
		}
	});
}

function updateUser(req,res){
	var userId = req.params.id;
	var userToUpdate = req.body;

	User.findByIdAndUpdate(userId, userToUpdate, (err, userUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		}else{
			if(!userUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				res.status(200). send({user: userUpdated});
			}
		}
	});
}

function deleteUser(req,res){
	var userId=req.params.id;

	Ticket.deleteOne({user: userId}).exec((err, res)=>{
		if(err){
			res.status(500).send({message: 'Error en eliminar los tickets del usuario con id:'+userId});
		}else{
			if(!users){
				res.status(404).send({message: 'No hay tickets asociados alusuario con id:'+userId});
			}else{
				res.status(200).send({status: 'OK'});
			}
		}	
	});

	Comment.deleteOne({user: userId}).exec((err, res)=>{
		if(err){
			res.status(500).send({message: 'Error en eliminar los comentarios del usuario con id:'+userId});
		}else{
			if(!res){
				res.status(404).send({message: 'No hay comentarios asociados al usuario con id:'+userId});
			}else{
				res.status(200).send({status: 'OK'});
			}
		}	
	});

	User.deleteOne({_id:userId}, (err, userDeleted) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el usuario'});
		}else{
			res.status(200).send({user: userDeleted});
		}
	});

}


module.exports = {
	saveUser,
    getUser,
	getUsers,
	updateUser,
	deleteUser,
	loginUser
};
