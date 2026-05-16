const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/:name', playerController.getByName);
router.post('/add', playerController.addPlayer);



module.exports = router;