const User = require('../models/user');

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

exports.deleteUser = async (req, res) => {
    try {
        await req.User.remove({});
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