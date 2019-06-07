const config = require('../app.config');
const Product = require('../products/product.model').Product;

function getProducts(req, res) {
    Product.find().then(products => res.json(products));
}

function updateProduct(req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body).then(result => {
        res.status(204).send();
    });
}

module.exports = {
    getProducts,
    updateProduct
}