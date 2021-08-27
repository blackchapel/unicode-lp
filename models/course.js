// Importing the module
const mongoose = require('mongoose');

// Creating a schema
const courseSchema = new mongoose.Schema({
    name: String, 
    instructor: String,
    language: String,
    type: String,
    rating: String, 
    dateAdded: String
});

const Course = mongoose.model('Course', courseSchema);

// Exporting the module
module.exports = Course;