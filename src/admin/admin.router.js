const router = require('express').Router();
const adminCtrl = require('./admin.controller');
const adminCheck = require('../middlewares/admin.js');

router.get('/products', adminCheck, adminCtrl.getProducts);
router.put('/products/:id', adminCheck, adminCtrl.updateProduct);
router.get('/products/:id/messages', adminCheck, adminCtrl.getMessages);
router.post('/products/:id/messages', adminCheck, adminCtrl.sendMessage);

module.exports = router;