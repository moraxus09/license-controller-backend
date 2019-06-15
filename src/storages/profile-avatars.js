const multer = require('multer');
const path = require('path');

module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profile-avatars/');
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
})