const router = require('express').Router();
const multer = require('multer');
const authCheck = require('../middlewares/auth');
const productsCtrl = require('./products.controller');
const documentsStorage = require('../storages/product-documents');
const Message = require('./message.model').Message;

router.get('/', authCheck, productsCtrl.getProducts);
router.post('/', authCheck, productsCtrl.createProduct);
router.put('/:id', authCheck, multer({ storage: documentsStorage }).array('documents'), productsCtrl.updateProduct);
router.delete('/:id', authCheck, productsCtrl.deleteProduct);
router.get('/:id/messages', authCheck, productsCtrl.getMessages);
router.post('/:id/messages', authCheck, productsCtrl.sendMessage);
router.post('/test', (req, res) => {
    fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyA_dfqmlGA9l3fWYiLNWR5keyBpO0zXt7Y&cx=008584258193415137263:7c1dnhw7mlk&q=car&callback=callback');
})

function callback(res) {
    const msg = {
        text: JSON.stringify(res),
        productId: 'dsadsa',
        sender: 'USER'
    }
}

module.exports = router;