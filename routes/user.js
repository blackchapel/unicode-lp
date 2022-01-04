// importing modules
const express = require('express');
const auth = require('../middleware/auth');
const { 
    user_create,
    user_login,
    user_logout,
    user_logoutAll,
    user_view,
    user_update,
    user_delete
} = require('../controllers/user');

const router = new express.Router();

// create new user
router.post('/create', upload.single('image'), user_create);

// user login
router.post('/login', user_login);

// user logout
router.post('/logout', auth.verifyjwt, user_logout);

// user logout from all active sessions
router.post('/logoutAll', auth.verifyjwt, user_logoutAll);

// displaying a user
router.get('/view/me', auth.verifyjwt, user_view);

// updating user details
router.put('/update/me', auth.verifyjwt, user_update);

// delete a user
router.delete('/delete/me', auth.verifyjwt, user_delete);

// exporting the module
module.exports = router;