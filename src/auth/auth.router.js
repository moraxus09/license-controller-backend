const router = require('express').Router();
const multer = require('multer');
const authCtrl = require('./auth.controller');
const authCheck = require('../middlewares/auth');
const avatarsStorage = require('../storages/profile-avatars');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/me', authCheck, authCtrl.me);
router.put('/me', authCheck, multer({storage: avatarsStorage}).single('avatar'), authCtrl.updateUser);

module.exports = router;