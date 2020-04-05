'use strict'
var Comment= require('../models/comments');

function saveComment(req, res){
	var params = req.body;
	
	var comment = new Comment();
	comment.comment = params.comment;
	comment.qualification = params.qualification;
	
	comment.save((err, commentStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!commentStored){
				res.status(404).send({message: 'No se ha guardado el comentario'});
			}else{
				res.status(200).send(commentStored);
			}
		}
	});
}

function getComment(req, res){
	var commentId = req.params.id;

	Comment.findById(commentId).exec((err, comment)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición', err, err});
		}else{
			if(!comment){
				res.status(404).send({message: 'No existe el comentario consultado.'});
			}else{
				res.status(200).send(comment);
			}
		}
	});
}

function updateComment(req, res){
	var commentId = req.params.id;
	var update = req.body;

	Comment.findByIdAndUpdate(commentId, update, (err, commentUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!commentUpdated){
				res.status(404).send({message: 'No se ha guardado el comentario'});
			}else{
				res.status(200). send({comment: commentUpdated});
			}
		}
	});
}

function getComments(req, res){
	Comment.find({}).exec(function(err, comments){
		if(err){
			
			res.status(500).send({message: 'Error en la petición'});
		}else{
			
			if(!comments){
				res.status(404).send({message: 'No hay Comentarios!!'});
			}else{
				res.status(200).send({comments});
			}
		}
	});
}

function deleteComment(req,res){
	var commentId=req.params.id;

	Comment.deleteOne({_id:commentId}, (err, commentDeleted) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		}else{
			res.status(200). send({comment: commentDeleted});
		}
	});
}

module.exports = {
	saveComment,
	getComment,
	getComments,
	deleteComment,
	updateComment
};
