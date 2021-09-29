// importing modules
const express = require('express');
const { 
    user_create,
    user_view,
    user_update,
    user_delete
} = require('../controllers/user');

const router = new express.Router();

// create new user
router.post('/create', user_create);

// displaying a user
router.get('/view/:username', user_view);

// updating user details
router.put('/update/:username', user_update);

// delete a user
router.delete('/delete/:username', user_delete);

// exporting the module
module.exports = router;