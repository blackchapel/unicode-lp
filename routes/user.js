// importing modules
const express = require('express');
const auth = require('../middleware/auth');
const multer = require('multer');
const { 
    user_create,
    user_login,
    user_logout,
    user_logoutAll,
    user_view,
    user_update,
    user_delete
} = require('../controllers/user');

const storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null , './public/uploads')
    },
    filename: function(req , file , cb){
        cb(null , file.originalname);  
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
      },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });
  

const router = new express.Router();

// create new user
router.post('/create', upload.single('image'), user_create);

// user login
router.post('/login', user_login);

// user logout
router.post('/logout', auth, user_logout);

// user logout from all active sessions
router.post('/logoutAll', auth, user_logoutAll);

// displaying a user
router.get('/view/me', auth, user_view);

// updating user details
router.put('/update/me', auth, user_update);

// delete a user
router.delete('/delete/me', auth, user_delete);

// exporting the module
module.exports = router;