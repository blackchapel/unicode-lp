// Importing the module
const mongoose = require('mongoose');

// Creating a schema
const userSchema = new mongoose.Schema({
    name: String,
    type: String,
    birthday: String,
    email: String
});

const User = mongoose.model('User', userSchema);

// Exporting the module
module.exports = User;