const express = require('express');
const UserController = require('../app/controllers/UserController');
const router = express.Router();
const { storage } = require('../utils/uploadFile');
const multer = require('multer');
const jwt_helper = require('../helpers/jwt_helper');

//Config Upload
const upload = multer({ storage: storage });

router.post(
  '/profile',
  [jwt_helper.verifyAccessToken, upload.single('avatar')],
  UserController.profile
);

module.exports = router;
