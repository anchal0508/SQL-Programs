const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/signup', userController.signup);



module.exports = router;