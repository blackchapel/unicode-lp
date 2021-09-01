// importing modules 
const Course = require('../models/course');

// creating a new course 
const createCourse = async (req, res) => {
    const course = new Course(req.body);
    try {
        await newCourse.save();
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
        const course = await Course.find({});
        res.status(201).json({
            message: "Found course",
            data: course
        });
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
        const course = await Course.findOneAndUpdate({name: req.params.name}, req.body, {new: true});

        if (!course) {
            res.status(404).json({
                message: "User does not exist"
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
        const course = await Course.find({name: req.params.name});
        res.status(201).json({
            message: "Found course",
            data: course
        });
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
        const course = await Course.find({instructor: req.params.instructor});
        res.status(201).json({
            message: "Found course",
            data: course
        });
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
        const course = await Course.find({language: req.params.language});
        res.status(201).json({
            message: "Found course",
            data: course
        });
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// deleting a course
const deleteCourse = async (req, res) => {
    try {
       await Course.deleteOne({name: req.params.name});
        res.status(201).json({
            message: "Deleted course"
        });
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
    deleteCourse
};