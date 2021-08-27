// Importing the module
const mongoose = require('mongoose');

// Creating a schema
const userSchema = new mongoose.Schema({
    name: String,
    type: String,
    birthday: String,
    email: String
});

const Student = mongoose.model('Student', userSchema);
const instructor = mongoose.model('Teacher', userSchema);

// Exporting the module
module.exports = Student;
module.exports = instructor;