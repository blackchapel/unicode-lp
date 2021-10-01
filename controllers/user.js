// importing modules
const User = require('../models/user');

// creating a new user
const user_create = async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        const token = await user.generateAuthToken();
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

// logging the user in
const user_login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token }); 
    } catch (error) {
        res.status(400).send();
    }
}

// logging the user out
const user_logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
}

// logging out of all sessions
const user_logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send()
    } catch (error) {
        res.staatus(500).send();
    }
}

// displaying user 
const user_view = async (req, res) => {
    req.send(req.user);
};

// updating user
const user_update = async (req, res) => {
    const updates = object.keys(req.body);
    const allowedUpdates = ['name', 'username', 'email', 'password', 'userType', 'birthday', 'enrolledIn', 'coursesCreated'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.status(200).json({
            message: "Updated user details",
            data: req.user
        });
    } catch(error) {
        res.status(400).json({
            message: error
        });
    }
};

// deleting a user 
const user_delete = async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch(error){
        res.status(400).json({
            message: error
        });
    } 
};

module.exports = {
    user_create,
    user_login,
    user_logout,
    user_logoutAll,
    user_view,
    user_update,
    user_delete
};