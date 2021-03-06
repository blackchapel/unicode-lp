// importing modules 
const Course = require('../models/course.js');
const User= require('../models/user.js')
const jwt = require('jsonwebtoken');

// creating a new course 
const course_create = async (req, res) => {
    const course = new Course(req.body);
    try {
        await course.save();
        res.status(201).json({
            message: "New course created",
            data: course
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// upload course documents
const course_document = async (req, res) => {
    try {
        res.status(201).json({
            message: 'Document uploaded'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// upload course videos
const course_video = async (req, res) => {
    try {
        res.status(201).json({
            message: 'Video uploaded'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// displaying course by id  
const course_viewById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('usersEnrolled');

        if(!course) {
            res.status(404).json({
                message: "No such course exists"
            });
        } else {
            res.status(200).json({
                message: "Found the course",
                data: course
            });
        }
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// displaying all the courses the user has enrolled in
const course_viewEnrolled = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.KEY);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }).populate('enrolledIn');

        if(user.enrolledIn.length === 0) {
            res.status(404).json({
                message: 'No courses found'
            });
        } else {
            res.status(200).json({
                message: 'Courses successfully displayed',
                data: user.enrolledIn
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// displaying all the courses
const course_viewAll = async (req, res) => {
    try {
        const course = await Course.find({}).populate('usersEnrolled');
        if(course.length === 0) {
            res.status(404).json({
                message: "No courses available"
            });
        } else {
            res.status(200).json({
                message: "Found courses",
                data: course
            });
        }
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// updating course details
const course_update = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('usersEnrolled');

        if (!course) {
            res.status(404).json({
                message: "Course does not exist"
            });
        } else {
            res.status(201).json({
                message: "Course details updated",
                data: course
            });
        }
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// // displaying courses by instructor
// const course_viewByInstructor = async (req, res) => {
//     try {
//         const course = await Course.find({instructor: req.params.instructor}).populate('usersEnrolled');

//         if(course.length === 0) {
//             res.status(404).json({
//                 message: "No courses created by this intructor"
//             });
//         }
//         else {
//             res.status(201).json({
//                 message: "Found courses",
//                 data: course
//             });
//         }
//     }
//     catch(error) {
//         res.status(400).json({
//             message: error.message
//         });
//     }
// };

// // displaying courses by language
// const course_viewByLanguage = async (req, res) => {
//     try {
//         const course = await Course.find({language: req.params.language}).populate('usersEnrolled');

//         if(course.length === 0) {
//             res.status(404).json({
//                 message: "No courses available in this particular language"
//             });
//         }
//         else {
//             res.status(201).json({
//                 message: "Found courses",
//                 data: course
//             });
//         }
//     }
//     catch(error) {
//         res.status(400).json({
//             message: error.message
//         });
//     }
// };

// // displaying courses by type
// const course_viewByType = async (req, res) => {
//     try {
//         const course = await Course.find({type: req.params.type}).populate('usersEnrolled');

//         if (course.length === 0) {
//             res.status(404).json({
//                 message: "No courses available of this type"
//             });
//         }
//         else {
//             res.status(201).json({
//                 message: "Found courses",
//                 data: course
//             });
//         }
//     }
//     catch (error) {
//         res.status(400).json({
//             message: error.message
//         });
//     }
// };

// deleting a course
const course_delete = async (req, res) => {
    try {
       const course = await Course.findByIdAndDelete(req.params.id);
       if (!course) {
           res.status(404).json({
               message: "Course does not exist"
            });
        } else {
            res.status(200).json({
                message: "Course has been deleted",
                data: course
            });
        }
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    course_create,
    course_document,
    course_video,
    course_viewById,
    course_viewEnrolled,
    course_viewAll,
    course_update,
    // course_viewByName,
    // course_viewByInstructor,
    // course_viewByLanguage,
    // course_viewByType,
    course_delete
};