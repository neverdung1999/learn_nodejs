const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads/'));
  },
  fileName: function (req, file, cb) {
    cb(null, new Date() + file.originalname);
  },
});

module.exports = { storage };
