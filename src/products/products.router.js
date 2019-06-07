const router = require('express').Router();
const authCheck = require('../middlewares/auth');
const productsCtrl = require('./products.controller');

router.get('/', authCheck, productsCtrl.getProducts);
router.post('/', authCheck, productsCtrl.createProduct);
router.put('/:id', authCheck, productsCtrl.updateProduct);
router.delete('/:id', authCheck, productsCtrl.deleteProduct);

module.exports = router;