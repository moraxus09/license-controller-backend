const mongoose = require('mongoose');

const senders = {
    user: 'USER',
    admin: 'ADMIN'
}

const messageSchema = mongoose.Schema({
    productId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    sender: { required: true, type: String },
    text: { required: true, type: String }
});
const Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message,
    senders
};