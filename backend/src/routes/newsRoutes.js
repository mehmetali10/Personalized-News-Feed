const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const requireAuth = require('../middlewares/authmiddleware'); 

router.get('/News/Read',  requireAuth, newsController.GetNews);

module.exports = router