const express = require('express');
const AuthController = require('../app/controllers/AuthController');
const router = express.Router();
const { noneVerifyAccessTokenRouter } = require('../helpers/routerHelper');

noneVerifyAccessTokenRouter(router, 'post', '/refresh-token',  AuthController.refreshToken);
noneVerifyAccessTokenRouter(router, 'post', '/register',  AuthController.register);
noneVerifyAccessTokenRouter(router, 'post', '/login', AuthController.login);

module.exports = router;
