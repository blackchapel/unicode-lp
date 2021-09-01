// Importing the module
const mongoose = require('mongoose');

// Creating a schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [4, 'Name is too short'],
        unique: true
    },
    instructor: { 
        type: String,
        required: true 
    },
    language: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: { type: String }, 
    dateAdded: {
        type: Date,
        required: true
    }, 
    usersEnrolled: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Course = mongoose.model('Course', courseSchema);

// Exporting the module
module.exports = Course;