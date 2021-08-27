const Course = require('../models/course');

exports.createCourse = async (req, res) => {
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

exports.viewCourse = async (req, res) => {
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

exports.viewCourseByName = async (req, res) => {
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

exports.viewCourseByInstructor = async (req, res) => {
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

exports.viewCourseByLanguage = async (req, res) => {
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

exports.deleteCourse = async (req, res) => {
    try {
       await req.Course.remove({});
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