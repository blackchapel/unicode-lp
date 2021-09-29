// importing modules
const User = require('../models/user');

// creating a new user
const user_create = async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).json({
            message: "User created",
            data: newUser
        });
    }
    catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// displaying user 
const user_view = async (req, res) => {
    try {
        const user = await User.find({username: req.params.username}).populate('enrolledIn', 'coursesCreated');

        if(user.length === 0) {
            res.status(404).json({
                message: "User does not exist"
            });
        } 
        else {
            res.status(200).json({
                message: "Found user",
                data: user
            });
        }
    }
    catch(error) {
        res.status(400).json({
            message: error
        });
    }
};

// updating user
const user_update = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({username: req.params.username}, req.body, {new: true});

        if(!user) {
            res.status(404).json({
                message: "User not found"
            });
        }
        else {
        res.status(200).json({
                message: "Updated user details",
                data: user
            });
        }
    }
    catch(error) {
        res.status(400).json({
            message: error
        });
    }
};

// deleting a user 
const user_delete = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({username: req.params.username});
        
        if (!user) {
            res.status(404).json({
                message: "User does not exist"
            });
        }
        else {
            res.status(201).json({
                message: "User deleted"
            });
        }
    }
    catch(error){
        res.status(400).json({
            message: error
        });
    } 
};

module.exports = {
    user_create,
    user_view,
    user_update,
    user_delete
};