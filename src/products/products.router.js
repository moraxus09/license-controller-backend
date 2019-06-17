const router = require('express').Router();
const multer = require('multer');
const authCheck = require('../middlewares/auth');
const productsCtrl = require('./products.controller');
const documentsStorage = require('../storages/product-documents');

router.get('/', authCheck, productsCtrl.getProducts);
router.post('/', authCheck, productsCtrl.createProduct);
router.put('/:id', authCheck, multer({ storage: documentsStorage }).array('documents'), productsCtrl.updateProduct);
router.delete('/:id', authCheck, productsCtrl.deleteProduct);
router.get('/:id/messages', authCheck, productsCtrl.getMessages);
router.post('/:id/messages', authCheck, productsCtrl.sendMessage);

module.exports = router;