// importing modules
const express = require('express')
const courseController = require('../controllers/course')
const router = new express.Router()

// create new course 
router.post('/create', courseController.createCourse);

// view all courses
router.get('/', courseController.viewCourse);

// view courses by name
router.get('/:name', courseController.viewCourseByName);

// view courses by instructor
router.get('/instructor/:instructor', courseController.viewCoursebByInstructor);

// view courses by language 
router.get('/language/:language', courseController.viewCourseByLanguage);

// delete a course
router.delete('/delete/:name', courseController.deleteCourse);

// exporting the module
module.exports = router;