
const router = require('express').Router();
const expenseController = require('../controller/expenseController');
const authentication = require('../middleware/auth');

router.get('/allexp', authentication.authenticate, expenseController.getAllexp);
router.post('/add', authentication.authenticate, expenseController.addExpense);
router.delete('/delete/:id', authentication.authenticate, expenseController.deleteExpense);


module.exports = router;