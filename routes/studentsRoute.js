const express = require('express');
const route = express.Router();
const studentController = require('../controller/studentsController');;

route.post('/', studentController.addStudent);
route.put('/:id', studentController.updateStudent);
route.get('/:id', studentController.getStudentById);
route.get('/', studentController.getAllStudents);
route.delete('/delete/:id', studentController.deleteStudent);


module.exports = route;