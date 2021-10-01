// importing modules
const express = require('express');
const auth = require('../middleware/auth');
const { 
    course_create,
    course_viewById,
    course_viewEnrolled,
    course_viewAll,
    course_update,
    // course_viewByInstructor,
    // course_viewByLanguage,
    // course_viewByType,
    course_delete
} = require('../controllers/course');

const router = new express.Router();

// create new course 
router.post('/create', course_create);

// view a course by id
router.get('/view/:id', course_viewById);

// view a course by id
router.get('/view/me', auth, course_viewEnrolled);

// view a course by id
router.get('/view/all', course_viewAll);

// update course details
router.put('/update', course_update);

// // view courses by instructor
// router.get('/view/instructor/:instructor',course_viewByInstructor);

// // view courses by language 
// router.get('/view/language/:language', course_viewByLanguage);

// // view courses by type
// router.get('/view/type/:type', course_viewByType);

// delete a course
router.delete('/delete/:id', auth, course_delete);

// exporting the module
module.exports = router;