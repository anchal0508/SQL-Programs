
const router = require('express').Router();
const expenseController = require('../controller/expenseController');

router.get('/allexp', expenseController.getAllexp);
router.post('/add', expenseController.addExpense);
router.delete('/delete/:id', expenseController.deleteExpense);


module.exports = router;