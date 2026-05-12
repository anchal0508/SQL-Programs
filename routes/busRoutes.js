const express = require('express');
const route = express.Router();
const busController = require('../controller/busController');

route.post('/', busController.addBus);
route.get('/:seats', busController.getAvailableBus);



module.exports = route;