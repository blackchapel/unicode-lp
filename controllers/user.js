// importing modules
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');

// creating a new user
const user_create = async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        const token = await User.generateAuthToken(newUser._id);
        res.status(201).json({
            message: "User created",
            data: newUser
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// profile picture upload
const user_profilePicture = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.KEY);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
        
        user.profilePicture = buffer;
        await user.save();

        res.status(201).json({
            message: 'Pofile picture uploaded'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// logging the user in
const user_login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await User.generateAuthToken(user._id);

        res.status(200).json({ 
            user,
            token
        }); 
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

// logging the user out
const user_logout = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.KEY);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        user.tokens = user.tokens.filter((usertoken) => {
            return usertoken.token !== token;
        });

        await user.save();

        res.status(200).json({
            message: 'Logged Out Successfully'
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// logging out of all sessions
const user_logoutAll = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.KEY);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        user.tokens = [];
        await user.save();

        res.status(200).json({
            message: 'Successfully logged out of all sessions!'
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// displaying user 
const user_view = async (req, res) => {
    req.send(req.user);
};

// updating user
const user_update = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.KEY);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'username', 'email', 'password', 'userType', 'birthday', 'enrolledIn', 'coursesCreated'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            res.status(400).json({
                message: 'Invalid'
            });
        }

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        res.status(200).json({
            message: "Updated user details",
            data: user
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// deleting a user 
const user_delete = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.KEY);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        await user.remove();

        res.status(200).json({
            message: "User deleted"
        });
    } catch(error){
        res.status(400).json({
            message: error
        });
    } 
};

module.exports = {
    user_create,
    user_profilePicture,
    user_login,
    user_logout,
    user_logoutAll,
    user_view,
    user_update,
    user_delete
};