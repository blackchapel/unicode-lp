// Importing modules
const multer = require('multer');

// Configuring storage for files
const storage_file = multer.diskStorage({
    destination: '../../public/uploads/files',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

// Configuring storage for videos
const storage_video = multer.diskStorage({
    destination: '../../public/uploads/videos',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

// File
const upload_file = multer({
    storage: storage_file,
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.pdf|ppt|odt|doc|docx/)) {
            return callback(new Error('Please upload a valid file!!'));
        }
        callback(undefined, true);
    }
});  

// Video Upload
const upload_video = multer({
    storage: storage_video,
    limits: {
        fileSize: 50000000,
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
            return callback(new Error('Please upload a video!!'));
        }
        callback(undefined, true);
    }
});

module.exports = {
    upload_file,
    upload_video
};