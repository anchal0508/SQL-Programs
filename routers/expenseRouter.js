
const router = require('express').Router();
const expenseController = require('../controller/expenseController');
const authentication = require('../middleware/auth');

router.get('/allexp',authentication.authenticate, expenseController.getAllexp);
router.post('/add', expenseController.addExpense);
router.delete('/delete/:id', expenseController.deleteExpense);


module.exports = router;