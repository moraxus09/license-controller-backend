const router = require('express').Router();
const authCheck = require('../middlewares/auth');
const productsCtrl = require('./products.controller');

router.get('/', authCheck, productsCtrl.getProducts);
router.post('/', authCheck, productsCtrl.createProduct);
router.delete('/:id', authCheck, productsCtrl.deleteProuct);

module.exports = router;