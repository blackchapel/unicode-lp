// Importing the module
const mongoose = require('mongoose');

// Creating a schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true,
        minlength: [4, 'Username too short'],
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    password: { 
        type: String,
        required: true,
        minlength: [8, 'Password too short'],
        maxlength: [128, 'Password too long']
    },
    userType: { type: [String] },
    birthday: { type: Date },
    enrolledIn: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course',
        default: []
    },
    coursesCreated: { 
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course'
    } 
});

const User = mongoose.model('User', userSchema);

// Exporting the module
module.exports = User;