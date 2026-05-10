const express = require('express');
const route = express.Router();
const studentController = require('../controller/studentsController');


route.post('/add', studentController.addEntries);
route.put('/update/:id', studentController.updateEntry);
route.delete('/delete/:id', studentController.deleteEntry);

module.exports  = route;