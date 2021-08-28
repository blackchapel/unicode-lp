// importing modules
const User = require('../models/user');

// creating a new user
exports.createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save({})
        res.status(201).json({
            message: "User created",
            data: newUser
        });
    }
    catch(error) {
        res.status(400).json({
            message: error,
            data: newUser
        });
    }
};

// displaying user 
exports.viewUser = async (req, res) => {
    try {
        const viewUser = await User.find({name: req.params.name});
        res.status(200).json({
            message: "Found user",
            data: viewUser
        });
    }
    catch(error) {
        res.status(400).json({
            message: error,
            data: viewUser
        });
    }
};

// deleteing a user 
exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({name: req.params.name});
        res.status(201).json({
            message: "User deleted"
        });
    }
    catch(error){
        res.status(400).json({
            message: error
        });
    } 
};