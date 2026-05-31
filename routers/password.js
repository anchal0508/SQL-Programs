 
const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/password');

router.post('/forgotpassword', passwordController.requestPasswordReset);
router.get('/resetpassword/:id', passwordController.resetPasswordForm);
router.post('/updatepassword/:id', passwordController.updatePassword);

module.exports = router;
