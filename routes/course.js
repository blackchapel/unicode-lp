// importing modules
const express = require('express');
const auth = require('../middleware/auth');
const {
    upload_file,
    upload_video
} = require('../utility/upload/course');
const { 
    course_create,
    course_document,
    course_video,
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
router.post('/create', [auth.verifyjwt, auth.user_type],course_create);

// upload document
router.post('/upload/document', [auth.verifyjwt, auth.user_type], upload_file('document'), course_document);

// upload video
router.post('/upload/video', [auth.verifyjwt, auth.user_type], upload_file('video'), course_video);

// view a course by id
router.get('/view/:id', course_viewById);

// view a course by id
router.get('/view/me', auth.verifyjwt, course_viewEnrolled);

// view a course by id
router.get('/view/all', course_viewAll);

// update course details
router.put('/update', [auth.verifyjwt, auth.user_type],course_update);

// // view courses by instructor
// router.get('/view/instructor/:instructor',course_viewByInstructor);

// // view courses by language 
// router.get('/view/language/:language', course_viewByLanguage);

// // view courses by type
// router.get('/view/type/:type', course_viewByType);

// delete a course
router.delete('/delete/:id', [auth.verifyjwt, auth.user_type], course_delete);

// exporting the module
module.exports = router;