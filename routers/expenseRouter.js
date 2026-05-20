
const router = require('express').Router();
const expenseController = require('../controller/expenseController');
const authentication = require('../middleware/auth');

router.get('/allexpLeader', authentication.authenticate, expenseController.getAllexpLeaderBoard);
router.get('/allexp', authentication.authenticate, expenseController.getAllexp);
router.post('/add', authentication.authenticate, expenseController.addExpense);
router.delete('/delete/:id', authentication.authenticate, expenseController.deleteExpense);
router.delete('/deleteall/:userId', authentication.authenticate, expenseController.deleteAllExpense);


module.exports = router;