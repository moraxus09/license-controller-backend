const Product = require('./product.model').Product;
const productStatuses = require('./product.model').productStatuses;
const _ = require('lodash');

function getProducts(req, res) {
    Product.find({ ownerId: req.userId })
        .select('-ownerId')
        .then(products => {
            if (req.query.status) {
                const neededStatuses = req.query.status.split(',');
                console.log(neededStatuses);
                products = products.filter(p => neededStatuses.includes(p.status));
            }
            res.status(200).json(products);
        });
}
 
function createProduct(req, res) {
    Product.create({ ownerId: req.userId, status: productStatuses.pending, ...req.body })
        .then(product => res.status(200).json(_.omit(product.toObject(), 'ownerId')));
}

function deleteProduct(req, res) {
    Product.deleteOne({ _id: req.params.id })
        .then(result => {
            result.n ? res.status(204).send() : res.status(500).send();
        });
}

function updateProduct(req, res) {
    if (req.files) {
        req.body.documents = req.files.map(file => {
            return `/product-documents/${req.params.id}/${file.filename}`;
        });
    }

    Product.updateOne({ _id: req.params.id }, req.body)
        .then(result => {
            result.n ? res.status(204).send() : res.status(500).send();
        });
}

module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
}