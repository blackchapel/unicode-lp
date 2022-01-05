// Importing the module
const mongoose = require('mongoose');
const Course = require ('../models/course');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// Creating a schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
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
    profilePicture: {
        type: String
    },
    userType: { 
        type: String,
        enum: ["STUDENT", "INSTRUCTOR"]
    },
    birthday: { type: Date },
    enrolledIn: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course',
        default: []
    },
    coursesCreated: { 
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course'
    },
    tokens: [{
        token: {
            type: String, 
            required: true
        }
    }]
});

userSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'instructor'
});

// Removing sensitive data from Public Profile
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// Generating authentication tokens
userSchema.statics.generateAuthToken = async (userid) => {
    const user = await User.findById(userid);
    const token = jwt.sign({ _id: user._id.toString()}, process.env.KEY);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

// Checking credentials to login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

// Hashing the password
userSchema.pre('save',async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8);
    }

    next();
})

// Delete course if instructors account is deleted
userSchema.pre('remove', async function (next) {
    const user = this;
    await Course.deleteMany({instructor: user._id});

    next();
}) 

const User = mongoose.model('User', userSchema);

// Exporting the module
module.exports = User;