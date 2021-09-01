// importing modules
const express = require('express');
const { 
    createUser,
    viewUser,
    updateUser,
    deleteUser 
} = require('../controllers/user');

const router = new express.Router();

// create new user
router.post('/create', createUser);

// displaying a user
router.get('/:username', viewUser);

// updating user details
router.put('/update/:username', updateUser);

// delete a user
router.delete('/delete/:username', deleteUser);

// exporting the module
module.exports = router;