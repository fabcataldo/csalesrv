'use strict'
var Role = require('../models/roles');

function saveRole(req, res){
	var role = new Role();

	var params = req.body;
	role.name = params.name;
	role.privileges = params.privileges;

	role.save((err, roleStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!roleStored){
				res.status(404).send({message: 'No se ha guardado el rol'});
			}else{
				res.status(200).send({role: roleStored});
			}
		}
	});
}

function getRole(req, res){
	var roleID = req.params.id;

	Role.findById(roleID).populate({path: 'privileges'}).exec((err, role)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición get Role'});
		}else{
			if(!role){
				res.status(404).send({message: 'El rol no existe.'});
			}else{
				res.status(200).send({role});
			}
		}
	});
}

function updateRole(req, res){
	var roleId = req.params.id;
	var update = req.body;

	Role.findByIdAndUpdate(roleId, update, (err, roleUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!roleUpdated){
				res.status(404).send({message: 'No se ha guardado el rol'});
			}else{
				res.status(200). send({role: roleUpdated});
			}
		}
	});
}

function getRoles(req, res){
	Role.find({}).populate({path : 'privileges'}).exec(function(err, roles){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!roles){
				res.status(404).send({message: 'No hay Roles!!'});
			}else{
				res.status(200).send({roles});
			}
		}
	});
}


function deleteRole(req,res){
	var roleID=req.params.id;

	Role.deleteOne({_id:roleID}, (err, roleDeleted) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el privilegio'});
		}else{
			res.status(200). send({role: roleDeleted});
		}
	});
}

module.exports = {
	saveRole,
    getRole,
    getRoles,
	updateRole,
	deleteRole
};
