// importing modules
const express = require('express');
const userController = require('../controllers/user');
const router = new express.Router();

// create new user
router.post('/create', userController.newUser);

// displaying a user
router.get('/:name', userController.viewUser);

// delete a user
router.delete('/delete/:name', userController.deleteUser);

// exporting the module
module.exports = router;