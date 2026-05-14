const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');

//  Add Users to the DataBase from Registration form
route.post('/add', userController.addUser);

// Get All Users
route.get('/', userController.getAllUsers);

// Get Users By ID number
// route.get('/:id', userController.getUserById);

// Edit User's Details
route.put('/:id', userController.updateUser);

// Delete User using ID number
route.delete('/:id', userController.deleteUser);

module.exports = route;