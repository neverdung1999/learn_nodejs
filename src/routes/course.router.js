const express = require('express');
const CourseController = require('../app/controllers/CourseController');
const router = express.Router();

router.delete('/delete/:id', CourseController.delete);
router.post('/update/:id', CourseController.update);
router.get('/edit/:id', CourseController.edit);
router.post('/create', CourseController.create);
router.get('/:slug', CourseController.detail);

module.exports = router;
