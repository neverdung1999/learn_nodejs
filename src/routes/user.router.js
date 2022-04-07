const UserController = require('../app/controllers/UserController');
const { storage } = require('../utils/uploadFile');
const multer = require('multer');
const { customRouter } = require('../helpers/routerHelper');
const express = require('express');
const router = express.Router();

//Config Upload
const upload = multer({ storage: storage });

// router.post(
//   '/profile',
//   [jwt_helper.verifyAccessToken, upload.single('avatar')],
//   UserController.update
// );

customRouter(router, 'post', '/profile', UserController.update, [upload.single('avatar')]);
customRouter(router, 'get', '/profile/:id', UserController.profile);
customRouter(router, 'post', '/test', UserController.test, [upload.array('image')]);

module.exports = router;
