const express = require('express');
const route = express.Router();

const busController = require('../controllers/busController')
route.post('/addBus', busController.addBus);
route.get('/available/:seats', busController.availableSeats);


module.exports = route;