const express = require('express');
const route = express.Router();
const thesisController = require('../controller/thesisController')


route.get('/api/thesis',thesisController.get)
route.get('/api/thesis/:id',thesisController.find)
route.post('/api/new/thesis', thesisController.create)
route.delete('/api/delete/thesis/:id', thesisController.delete)

module.exports = route