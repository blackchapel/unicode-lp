// Importing the modules
const mongoose = require('mongoose');

const connectionParameters = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connecting to the database
const uri = `mongodb+srv://learningportal:learningportal123@cluster0.jpcvy.mongodb.net/LearningPortal?retryWrites=true&w=majority`;
const connection = mongoose.connect(uri, connectionParameters)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log(error);
    });

module.exports = connection;