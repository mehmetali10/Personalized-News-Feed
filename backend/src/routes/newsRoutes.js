const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/News/Read', newsController.GetNews);

module.exports = router