const router = require('express').Router();
const authCheck = require('../middlewares/auth');
const productsCtrl = require('./products.controller');

router.get('/', authCheck, productsCtrl.getProducts);
router.post('/', authCheck, productsCtrl.createProduct);

module.exports = router;