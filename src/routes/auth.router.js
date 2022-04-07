const express = require('express');
const AuthController = require('../app/controllers/AuthController');
const router = express.Router();

router.post('/logout', AuthController.logout);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;
