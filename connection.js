// Importing the modules
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectionParameters = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connecting to the database
const uri = `mongodb+srv://user-ojasy:goaldiggers2020@cluster0.btfod.mongodb.net/UnicodeTask5?retryWrites=true&w=majority`;
const connection = mongoose.connect(uri, connectionParameters)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log(error);
    });

// exporting the module
module.exports = connection;