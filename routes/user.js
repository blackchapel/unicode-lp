// importing modules
const express = require('express');
const router = new express.Router();
const {
    newUser,
    deleteUser
} = require('../controllers/user');

// create new user
router.post('/create', newUser);

// delete a user
router.delete('/delete/:name', deleteUser);

module.exports = router;