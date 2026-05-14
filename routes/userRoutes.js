const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.post('/buses', userController.createBus);
router.post('/bookings', userController.createBooking);
router.get('/users/:id/bookings', userController.getUserBookings);
router.get('/buses/:id/bookings', userController.getBusBookings);



module.exports = router;