// importing modules
const express = require('express')
const router = new express.Router()
const {
  createCourse,
  viewCourse,
  viewCourseByName,
  viewCoursebByInstructor,
  viewCourseByLanguage,
  deleteCourse
} = require('../controllers/course')

// create new course 
router.post('/create', createCourse)

// view all courses
router.get('/', viewCourse)

// view courses by name
router.get('/:name', viewCourseByName)

// view courses by instructor
router.get('/instructor/:instructor', viewCoursebByInstructor)

// view courses by language 
router.get('/language/:language', viewCourseByLanguage)

// delete a course
router.delete('/delete/:name', deleteCourse)

// exporting the module
module.exports = router;