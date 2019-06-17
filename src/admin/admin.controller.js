const config = require('../app.config');
const Product = require('../products/product.model').Product;
const productStatuses = require('../products/product.model').productStatuses;

function getProducts(req, res) {
    Product.find().then(products => res.json(products));
}

function updateProduct(req, res) {

    if (req.body.status === productStatuses.scriptWorking) {
        req.body.status = productStatuses.waitingScriptReview;
        req.body.links = [
            'https://kekister.com',
            'https://kekister-jhons.ru',
            'https://kekister-jhoanna.com',
            'https://kekislav.uk',
            'https://mr-kek.com',
            'https://kekenpower228.com',
            'https://kekerton.gg'
        ]
    } else if (req.body.status === productStatuses.waitingPayment) {
        req.body.price = req.body.links.length * 100 + '$';
    }

    Product.findByIdAndUpdate(req.params.id, req.body).then(result => {
        res.status(200).json(req.body);
    });
}

module.exports = {
    getProducts,
    updateProduct
}