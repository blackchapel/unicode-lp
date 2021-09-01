// importing modules
const express = require('express');
const { 
    createUser,
    viewUser,
    deleteUser 
} = require('../controllers/user');

const router = new express.Router();

// create new user
router.post('/create', createUser);

// displaying a user
router.get('/:name', viewUser);

// delete a user
router.delete('/delete/:name', deleteUser);

// exporting the module
module.exports = router;