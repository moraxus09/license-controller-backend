const mongoose = require('mongoose');

const productStatuses = {
    pending: 'PENDING',
    approved: 'APPROVED',
    rejected: 'REJECTED',
    scriptWorking: 'SCRIPT_WORKING',
    waitingScriptReview: 'WAITING_FOR_RESULTS_REVIEW',
    waitingPayment: 'WAITING_FOR_PAYMENT',
    payed: 'PAYED'
};

const productSchema = mongoose.Schema({
    ownerId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { required: true, type: String },
    description: { required: true, type: String },
    status: { required: true, type: String, default: productStatuses.pending },
    keywords: { required: false, type: Array },
    links: { required: false, type: Array },
    documents: { required: false, type: Array },
    price: { required: false, type: String }
});
const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product,
    productStatuses
}