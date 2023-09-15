const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/auth/signup', authController.signup);
router.post('/auth/signin', authController.login);


module.exports = router;