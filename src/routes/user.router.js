const UserController = require('../app/controllers/UserController');
const { storage } = require('../utils/uploadFile');
const multer = require('multer');
const { customRouter } = require('../helpers/routerHelper');
const express = require('express');
const router = express.Router();

//Config Upload
const upload = multer({ storage: storage });

//Router with middleware
customRouter(router, 'post', '/profile', UserController.update, [upload.single('avatar')]);
customRouter(router, 'get', '/profile/:id', UserController.profile);

module.exports = router;
