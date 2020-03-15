'use strict'
var Ticket = require('../models/tickets');

function getTicket(req, res) {
	var ticketId = req.params.id;

	Ticket.findById(ticketId)
	.populate({
		
		path: 'user', 
		populate: {
			path: 'role',
			populate: {
				path: 'privileges'
			}
		},
	})
	.populate({
		path:'place'
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
		path: 'products',
		populate: {
			path: 'place'
		}
	})
	.populate('place')
		.populate({

			path: 'user',
			populate: {
				path: 'role',
				populate: {
					path: 'privileges'
				}
			},

		})


		.exec((err, tickets) => {
			if (err) {
				res.status(500).send({ message: 'Error en la petición' });
			} else {
				if (!tickets) {
					res.status(404).send({ message: 'No hay tickets cargados' });
				} else {
					res.status(200).send({ tickets });
				}
			}
		});
}

function saveTicket(req, res) {
	var ticket = new Ticket();
	var params = req.body;

	ticket.date_of_purchase = params.date_of_purchase;
	ticket.user = params.user;
	for(let i=0;i<params.payment_methods.length;i++){
		ticket.payment_methods.push(params.payment_methods[i])
	}

	ticket.products=params.products;
	ticket.place=params.place;

	ticket.save((err, ticketStored) => {
		if (err) {
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
			res.status(500).send({ message: 'Error al actualizar el ticket' });
		} else {
			if (!ticketUpdated) {
				res.status(404).send({ message: 'No se ha podido actualizar el ticket' });
			} else {
				res.status(200).send({ automaticFunction: ticketUpdated });
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
