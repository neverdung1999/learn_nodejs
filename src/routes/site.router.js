const express = require('express');
const SiteController = require('../app/controllers/SiteController');
const router = express.Router();

router.get('/', SiteController.index);
router.get('/search', SiteController.search);

module.exports = router;
