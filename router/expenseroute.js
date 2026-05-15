const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');

router.post('/add', expenseController.addExpense);
router.get('/', expenseController.getAll);
router.delete('/delete/:id', expenseController.deleteExp);
router.put('/update/:id', expenseController.updateExpense);


module.exports = router;