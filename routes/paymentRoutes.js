const router = require('express').Router();

const {getPaymentPage, processPayment, getPaymentStatus} = require('../controllers/paymentController');

router.get('/', getPaymentPage);
router.post ('/pay', processPayment);
router.get('/payemnt-status/:paymentSessionId', getPaymentStatus);


module.exports = router;