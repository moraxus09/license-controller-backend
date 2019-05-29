const mongoose = require('mongoose');

const productStatuses = {
    pending: 'PENDING',
    approved: 'APPROVED',
    rejected: 'REJECTED'
};

const productSchema = mongoose.Schema({
    ownerId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { required: true, type: String },
    description: { required: true, type: String },
    status: { required: true, type: String, default: productStatuses.pending }
});
const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product,
    productStatuses
}