const express = require('express');
const courseController = require('../controller/courseController');
const route = express.Router();


route.post('/addCourses', courseController.addCourse);
route.get('/addUserCourses', courseController.addUserToCourses);

module.exports = route;