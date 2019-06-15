const config = require('../app.config');
const Product = require('../products/product.model').Product;
const productStatuses = require('../products/product.model').productStatuses;

function getProducts(req, res) {
    Product.find().then(products => res.json(products));
}

function updateProduct(req, res) {
    if (req.body.status === productStatuses.scriptWorking) {
        setTimeout(() => {
            Product.findByIdAndUpdate(req.params.id, {
                status: productStatuses.waitingScriptReview,
                links: [
                    'https://kekister.com',
                    'https://kekister-jhons.ru',
                    'https://kekister-jhoanna.com',
                    'https://kekislav.uk',
                    'https://mr-kek.com',
                    'https://kekenpower228.com',
                    'https://kekerton.gg'
                ]
            });
        }, 1000 * 30);
    }

    Product.findByIdAndUpdate(req.params.id, req.body).then(result => {
        res.status(204).send();
    });
}

module.exports = {
    getProducts,
    updateProduct
}