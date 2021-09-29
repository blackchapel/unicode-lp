// importing modules
const express = require('express');
const { 
    course_create,
    course_view,
    course_update,
    course_viewByName,
    course_viewByInstructor,
    course_viewByLanguage,
    course_viewByType,
    course_delete
} = require('../controllers/course');

const router = new express.Router();

// create new course 
router.post('/create', course_create);

// view all courses
router.get('/view', course_view);

// update course details
router.put('/update', course_update);

// view courses by name
router.get('/view/name/:name', course_viewByName);

// view courses by instructor
router.get('/view/instructor/:instructor',course_viewByInstructor);

// view courses by language 
router.get('/view/language/:language', course_viewByLanguage);

// view courses by type
router.get('/view/type/:type', course_viewByType);

// delete a course
router.delete('/delete/:name', course_delete);

// exporting the module
module.exports = router;