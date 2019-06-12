const router = require('express').Router();
const authCtrl = require('./auth.controller');
const authCheck = require('../middlewares/auth');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/me', authCheck, authCtrl.me);

module.exports = router;