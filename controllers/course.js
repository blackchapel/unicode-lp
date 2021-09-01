// importing modules 
const Course = require('../models/course');

// creating a new course 
const createCourse = async (req, res) => {
    const newCourse = new Course(req.body);
    try {
        await newCourse.save();
        res.status(201).json({
            message: "New course created",
            data: newCourse
        });
    }
    catch(error) {
        res.status(400).json({
            message: error
        });
    }
};

// displaying all the courses
const viewCourse = async (req, res) => {
    try {
        const viewCourse = await Course.find({});
        res.status(201).json({
            message: "Found course",
            data: viewCourse
        });
    }
    catch(error) {
        res.status(400).json({
            message: error
        });
    }
};

// displaying courses by name 
const viewCourseByName = async (req, res) => {
    try {
        const viewCourseByName = await Course.find({name: req.params.name});
        res.status(201).json({
            message: "Found course",
            data: viewCourseByName
        });
    }
    catch(error) {
        res.status(400).json({
            message: error
        });
    }
};

// displaying courses by instructor
const viewCourseByInstructor = async (req, res) => {
    try {
        const viewCourseByInstructor = await Course.find({instructor: req.params.instructor});
        res.status(201).json({
            message: "Found course",
            data: viewCourseByInstructor
        });
    }
    catch(error) {
        res.status(400).json({
            message: error
        });
    }
};

// displaying courses by language
const viewCourseByLanguage = async (req, res) => {
    try {
        const viewCourseByLanguage = await Course.find({language: req.params.language});
        res.status(201).json({
            message: "Found course",
            data: viewCourseByLanguage
        });
    }
    catch(error) {
        res.status(400).json({
            message: error
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
            message: error
        });
    }
};

module.exports = {
    createCourse,
    viewCourse,
    viewCourseByName,
    viewCourseByInstructor,
    viewCourseByLanguage,
    deleteCourse
};