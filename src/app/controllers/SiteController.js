const Course = require('../models/course.models');

class SiteController {
  // [GET] /
  index(req, res, next) {
    Course.find()
      .then((courses) => {
        res.send(courses);
      })
      .catch((error) => next);
  }

  // [GET] /search
  search(req, res) {
    res.send('search');
  }
}

module.exports = new SiteController();
