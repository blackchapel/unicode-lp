// importing modules
const express = require('express');
const { 
    createCourse, 
    viewCourse,
    updateCourse,
    viewCourseByName, 
    viewCourseByInstructor, 
    viewCourseByLanguage, 
    deleteCourse
} = require('../controllers/course');

const router = new express.Router();

// create new course 
router.post('/create', createCourse);

// view all courses
router.get('/', viewCourse);

// update course details
router.put('/update', updateCourse);

// view courses by name
router.get('/:name', viewCourseByName);

// view courses by instructor
router.get('/instructor/:instructor', viewCourseByInstructor);

// view courses by language 
router.get('/language/:language', viewCourseByLanguage);

// delete a course
router.delete('/delete/:name', deleteCourse);

// exporting the module
module.exports = router;