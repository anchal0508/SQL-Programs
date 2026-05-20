
const router = require('express').Router();
const expenseController = require('../controller/expenseController');
const userController = require('../controller/userController');

router.get('/alluser', userController.getAlluser);
router.post('/add', userController.addUser);
router.post('/login', userController.login);



module.exports = router;