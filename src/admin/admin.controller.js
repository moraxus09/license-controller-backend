const config = require('../app.config');
const Product = require('../products/product.model').Product;
const Message = require('../products/message.model').Message;
const productStatuses = require('../products/product.model').productStatuses;
const messageSenders = require('../products/message.model').senders;

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

function getMessages(req, res) {
    Message.find({ productId: req.params.id }).then(messages => {
        res.status(200).json(messages.map(msg => {
            return { sender: msg.sender, text: msg.text };
        }));
    })
}

function sendMessage(req, res) {
    const message = {
        productId: req.params.id,
        sender: messageSenders.admin,
        text: req.body.text 
    }

    Message.create(message).then(() => {
        res.status(204).send();
    })
}

module.exports = {
    getProducts,
    updateProduct,
    getMessages,
    sendMessage
}