// Importing the modules
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectionParameters = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Creating different enviornments
let uri;

if (process.env.ENVIRONMENT === 'production') {
    uri = process.env.URI;
} else if (process.env.ENVIRONMENT === 'test') {
    uri = process.env.URI_TEST;
}

// Connecting to the database
const connection = mongoose.connect(uri, connectionParameters)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log(error);
    });

// exporting the module
module.exports = connection;