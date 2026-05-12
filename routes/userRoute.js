const express = require('express');
const route = express();
const userController = require('../controller/userController');


route.get('/', userController.getAllUsers);
route.post('/add', userController.addUser);
route.put('/update/:id', userController.updateUser);
route.delete('/delete/:id', userController.deleteUser);



module.exports  = route;