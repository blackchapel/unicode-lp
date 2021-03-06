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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
        type: Date
    }, 
    usersEnrolled: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
});

const Course = mongoose.model('Course', courseSchema);

// Exporting the module
module.exports = Course;