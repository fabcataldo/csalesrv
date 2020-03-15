'use strict'

var express = require('express');
var CommentsController = require('../controllers/comments');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/comments/:id', md_auth.ensureAuth, CommentsController.getComment);
api.get('/comments', md_auth.ensureAuth, CommentsController.getComments);
api.post('/comments', md_auth.ensureAuth, CommentsController.saveComment);
api.put('/comments/:id', md_auth.ensureAuth, CommentsController.updateComment);
api.delete('/comments/:id', md_auth.ensureAuth, CommentsController.deleteComment);

module.exports = api;
