// Importing modules
const multer = require('multer');

const upload_picture = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.jpg|jpeg|png/)) {
            return cb(new Error('Incorrect file format! Please enter image!!'));
        }
        callback(undefined, true);
    }
});

module.exports = upload_picture;