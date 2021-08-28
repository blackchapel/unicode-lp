// importing modules
const express = require('express');
const router = new express.Router();
const {
    newUser,
    viewUser,
    deleteUser
} = require('../controllers/user');

// create new user
router.post('/create', newUser);

// displaying a user
router.get('/:name', viewUser);

// delete a user
router.delete('/delete/:name', deleteUser);

// exporting the module
module.exports = router;