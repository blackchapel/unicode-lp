
// Importing modules
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../models/user.js');
const Course = require('../../models/course.js');
const dotenv = require('dotenv').config();

// Creating database for testing
const user_id = new mongoose.Types.ObjectId();
const course_id = new mongoose.Types.ObjectId();

const userOne = {
    _id: user_id,
    name: 'Yash B.',
    email: 'bb@gmail.com',
    password: 'youcantseeme',
    userType: 'INSTRUCTOR',
    tokens: [{token: jwt.sign({ _id: user_id.toString() }, process.env.KEY)}]
};

const courseOne = {
    _id: course_id,
    name: 'Zero to Hero: Machine Learning',
    instructor: user_id,
    language: 'English',
    category: 'Machine Learning'
};

const databaseReq = async () => {
    await User.deleteMany();
    await Course.deleteMany();
    await new User(userOne).save();
    await new Course(courseOne).save();
};

module.exports = {
    userOne,
    courseOne,
    databaseReq
};