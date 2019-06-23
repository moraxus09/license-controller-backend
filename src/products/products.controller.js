const Product = require('./product.model').Product;
const Message = require('./message.model').Message;
const productStatuses = require('./product.model').productStatuses;
const messageSenders = require('./message.model').senders;
const _ = require('lodash');
const mailer = require('../mailer/mailer');

function getProducts(req, res) {
    console.log(req.userId)
    Product.find({ ownerId: req.userId })
        .select('-ownerId')
        .then(products => {
            console.log(products);
            if (req.query.status) {
                const neededStatuses = req.query.status.split(',');
                products = products.filter(p => neededStatuses.includes(p.status));
            }
            res.status(200).json(products);
        });
}
 
function createProduct(req, res) {
    console.log(req.userId);
    Product.create({ ownerId: req.userId, status: productStatuses.pending, ...req.body })
        .then(product => {
            res.status(200).json(_.omit(product.toObject(), 'ownerId'));
            mailer.sendProductCreated(req.userEmail);
        });
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
            return `${req.protocol}://${req.host}/product-documents/${req.params.id}/${file.filename}`;
        });
    }

    if (req.body.status === productStatuses.payed) {
        Message.create({
            productId: req.params.id,
            sender: messageSenders.admin,
            text: 'Оплата вашого продутку пройшла успішно, подальша робота передана виконавцю, ви можете задати будь-які питання які вас цікавлять в цьому чаті.'
        })ж
        mailer.sendProductPayed(req.userEmail);
    }

    Product.updateOne({ _id: req.params.id }, req.body)
        .then(result => {
            result.n ? res.status(200).json(req.body) : res.status(500).send();
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
        sender: messageSenders.user,
        text: req.body.text 
    }

    Message.create(message).then(() => {
        res.status(204).send();
    })
}

module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getMessages,
    sendMessage,
}