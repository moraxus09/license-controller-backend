const router = require('express').Router();
const authCtrl = require('./auth.controller');

router.use('/register', authCtrl.register);
router.use('/login', authCtrl.login);

module.exports = router;