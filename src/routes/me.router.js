const express = require('express');
const MeController = require('../app/controllers/MeController');
const router = express.Router();
const { storage } = require('../utils/uploadFile');
const multer = require('multer');
const jwt_helper = require('../helpers/jwt_helper');

//Config Upload
const upload = multer({ storage: storage });

router.post(
  '/profile',
  [jwt_helper.verifyAccessToken, upload.single('avatar')],
  MeController.profile
);

module.exports = router;
