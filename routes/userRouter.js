const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');

route.post('/addUser', userController.addUser);


module.exports = route;