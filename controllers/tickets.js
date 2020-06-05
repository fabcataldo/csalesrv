'use strict'
var Ticket = require('../models/tickets');


function getTicket(req, res) {
	var ticketId = req.params.id;

	Ticket.findById(ticketId)
	.populate({
		path: 'purchased_products',
			populate: {
				path: 'product'
			}
	})
	.populate({
		path: 'payment_methods',
		populate: {
			path: 'payment_method'
		}
	})
	.populate({
		path: 'payment_methods',
		populate: {
			path: 'card'
		}
	})
	.exec((err, ticket) => {
		if (err) {
			res.status(500).send({ message: 'Error en la petición' });
		} else {
			if (!ticket) {
				res.status(404).send({ message: 'No hay ticket cargado' });
			} else {
				res.status(200).send({ ticket });
			}
		}
	});
}


function getTickets(req, res) {
	Ticket.find({})
	.populate({
		path: 'purchased_products',
		populate:{
			path: 'product'
		}
	})
	.populate({
		path: 'payment_methods',
		populate: {
			path: 'payment_method'
		}
	})
	.populate({
		path: 'payment_methods',
		populate: {
			path: 'card'
		}
	})
	.exec((err, tickets) => {
			if (err) {
				res.status(500).send({ message: 'Error en la petición' });
			} else {
				if (!tickets) {
					res.status(404).send({ message: 'No hay tickets cargados' });
				} else {
					res.status(200).send(tickets);
				}
			}
		});
}

function saveTicket(req, res) {
	var ticket = new Ticket();
	var params = req.body;

	ticket.date_of_purchase = params.date_of_purchase;
	ticket.user = params.user;


	params.payment_methods.forEach(function(item){
		ticket.payment_methods.push(item)
	})
	params.purchased_products.forEach(function(item){
		ticket.purchased_products.push(item)
	})
	ticket.place = params.place;
	ticket.total = params.total;

	ticket.save((err, ticketStored) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: 'Error en el servidor' });
		} else {
			if (!ticketStored) {
				res.status(404).send({ message: 'No se ha guardado el ticket' });
			} else {
				res.status(200).send({ ticket: ticketStored });
			}
		}
	});
}


function updateTicket(req, res) {
	var ticketId = req.params.id;
	var ticketToUpdate = req.body;

	Ticket.findByIdAndUpdate(ticketId, ticketToUpdate, (err, ticketUpdated) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: 'Error al actualizar el ticket' });
		} else {
			if (!ticketUpdated) {
				res.status(404).send({ message: 'No se ha podido actualizar el ticket' });
			} else {
				res.status(200).send(ticketUpdated);
			}
		}
	});
}

function deleteTicket(req, res) {
	var ticketId = req.params.id;

	Ticket.deleteOne({ _id: ticketId }, (err, ticketDeleted) => {
		if (err) {
			res.status(500).send({ message: 'Error al eliminar el ticket' });
		} else {
			res.status(200).send({ comment: ticketDeleted });
		}
	});
}

module.exports = {
	getTicket,
	getTickets,
	updateTicket,
	saveTicket,
	deleteTicket
};
