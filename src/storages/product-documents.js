const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        const fileDest = `public/product-documents/${req.params.id}/`;
        if (!fs.existsSync(fileDest)) {
            fs.mkdirSync(fileDest);
        }
        cb(null, fileDest);
    },
    filename: (req, file, cb) => {
        const parsedName = path.parse(file.originalname);
        const fileName = parsedName.name + Date.now() + parsedName.ext;
        cb(null, fileName);
    }
});