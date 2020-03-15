'use strict'
var Privilege = require('../models/privileges');

function savePrivilege(req, res){
	var privilege = new Privilege();

	var params = req.body;

	privilege.name = params.name;
	privilege.description = params.description;

	privilege.save((err, privilegeStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!privilegeStored){
				res.status(404).send({message: 'No se ha guardado el privilegio'});
			}else{
				res.status(200).send({privilege: privilegeStored});
			}
		}
	});
}

function getPrivilege(req, res){
	var privilegeID = req.params.id;

	Privilege.findById(privilegeID).exec((err, privilege)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición get Privilege'});
		}else{
			if(!privilege){
				res.status(404).send({message: 'El privilegio no existe.'});
			}else{
				res.status(200).send({privilege});
			}
		}
	});
}

function updatePrivilege(req, res){
	var privilegeId = req.params.id;
	var update = req.body;

	Privilege.findByIdAndUpdate(privilegeId, update, (err, privilegeUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!privilegeUpdated){
				res.status(404).send({message: 'No se ha guardado el privilegio'});
			}else{
				res.status(200). send({privilege: privilegeUpdated});
			}
		}
	});
	
}

function getPrivileges(req, res){
	Privilege.find({}).exec(function(err, privileges){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!privileges){
				res.status(404).send({message: 'No hay Privilegios !!'});
			}else{
				res.status(200).send({privileges});
			}
		}
	});
}

function deletePrivilege(req,res){
	var privilegeId=req.params.id;

	Privilege.deleteOne({_id:privilegeId}, (err, privilegeDeleted) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el privilegio'});
		}else{
			res.status(200). send({privilege: privilegeDeleted});
		}
	});
}

module.exports = {
	savePrivilege,
    getPrivilege,
    getPrivileges,
	updatePrivilege,
	deletePrivilege
};
