// importing modules 
const Course = require('../models/course');

// creating a new course 
const createCourse = async (req, res) => {
    const course = new Course(req.body);
    try {
        await course.save();
        res.status(201).json({
            message: "New course created",
            data: course
        });
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// displaying all the courses
const viewCourse = async (req, res) => {
    try {
        const course = await Course.find({}).populate('usersEnrolled');
        
        if(course.length === 0) {
            res.status(404).json({
                message: "No courses available"
            });
        }
        else {
            res.status(201).json({
                message: "Found courses",
                data: course
            });
        }
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// updating course details
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).populate('usersEnrolled');

        if (!course) {
            res.status(404).json({
                message: "Course does not exist"
            });
        }
        else {
            res.status(201).json({
                message: "Course details updated",
                data: course
            });
        }
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// displaying courses by name 
const viewCourseByName = async (req, res) => {
    try {
        const course = await Course.find({name: req.params.name}).populate('usersEnrolled');

        if(course.length === 0) {
            res.status(404).json({
                message: "No such course exists"
            });
        }
        else {
            res.status(201).json({
                message: "Found the course",
                data: course
            });
        }
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// displaying courses by instructor
const viewCourseByInstructor = async (req, res) => {
    try {
        const course = await Course.find({instructor: req.params.instructor}).populate('usersEnrolled');

        if(course.length === 0) {
            res.status(404).json({
                message: "No courses created by this intructor"
            });
        }
        else {
            res.status(201).json({
                message: "Found courses",
                data: course
            });
        }
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// displaying courses by language
const viewCourseByLanguage = async (req, res) => {
    try {
        const course = await Course.find({language: req.params.language}).populate('usersEnrolled');

        if(course.length === 0) {
            res.status(404).json({
                message: "No courses available in this particular language"
            });
        }
        else {
            res.status(201).json({
                message: "Found courses",
                data: course
            });
        }
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// displaying courses by type
const viewCourseByType = async (req, res) => {
    try {
        const course = await Course.find({type: req.params.type}).populate('usersEnrolled');

        if (course.length === 0) {
            res.status(404).json({
                message: "No courses available of this type"
            });
        }
        else {
            res.status(201).json({
                message: "Found courses",
                data: course
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// deleting a course
const deleteCourse = async (req, res) => {
    try {
       const course = await Course.findOneAndDelete({name: req.params.name});
       if (!course) {
        res.status(404).json({
            message: "Course does not exist"
        });
    }
    else {
        res.status(201).json({
            message: "Course has been deleted",
            data: course
        });
    }
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    createCourse,
    viewCourse,
    updateCourse,
    viewCourseByName,
    viewCourseByInstructor,
    viewCourseByLanguage,
    viewCourseByType,
    deleteCourse
};