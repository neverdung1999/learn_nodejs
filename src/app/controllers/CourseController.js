const Course = require('../models/course.models');

class CourseController {
  // [GET] /courses/:slug
  detail(req, res, next) {
    const slug = req.params.slug;
    Course.findOne({ slug })
      .then((course) => {
        res.send(course);
      })
      .catch(next);
  }

  // [POST] /courses/create
  create(req, res, next) {
    console.log(req.body);
    const data = req.body;
    data['image'] = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
    Course.create(data)
      .then((course) => {
        res.json(course);
      })
      .catch(next);
  }

  // [GET] /courses/edit/:id
  edit(req, res, next) {
    const id = req.params.id;
    console.log({ id });
    Course.findById(id)
      .then((course) => res.send(course))
      .catch(next);
  }

  // [POST] /courses/update/:id
  update(req, res, next) {
    const data = req.body;
    data['image'] = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
    Course.findByIdAndUpdate(req.params.id, data)
      .then((course) => {
        res.send(course);
      })
      .catch(next);
  }

  // [DELETE] /courses/delete/:id
  delete(req, res, next) {
    const id = req.params.id;
    Course.findByIdAndUpdate(id, { isShow: false })
      .then((course) => {
        if(!course) return res.status(404).json({ message: 'course not found' }); 
        res.status(200).json({ message: 'successfully' });
      })
      .catch(next);
  }
}

module.exports = new CourseController();
