const Product = require('./product.model').Product;
const productStatuses = require('./product.model').productStatuses;
const _ = require('lodash');

function getProducts(req, res) {
    Product.find({ ownerId: req.userId })
        .select('-ownerId')
        .then(products => res.status(200).json(products));
}

function createProduct(req, res) {
    Product.create({ ownerId: req.userId, status: productStatuses.pending, ...req.body })
        .then(product => res.status(200).json(_.omit(product.toObject(), 'ownerId')));
}

module.exports = {
    getProducts,
    createProduct
}