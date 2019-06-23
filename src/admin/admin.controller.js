const axios = require('axios');
const html = require('node-html-parser');
const config = require('../app.config');
const Product = require('../products/product.model').Product;
const Message = require('../products/message.model').Message;
const User = require('../auth/user.model');
const productStatuses = require('../products/product.model').productStatuses;
const messageSenders = require('../products/message.model').senders;
const mailer = require('../mailer/mailer');

function getProducts(req, res) {
    Product.find().then(products => {
        if (req.query.status) {
            const neededStatuses = req.query.status.split(',');
            products = products.filter(p => neededStatuses.includes(p.status));
        }
        res.status(200).json(products);
    });
}

function updateProduct(req, res) {

    if (req.body.status === productStatuses.scriptWorking) {
        req.body.status = productStatuses.waitingScriptReview;
        Promise.all(req.body.keywords.map(keyword => {
            const encoded = encodeURIComponent(keyword);
            return axios.get(`https://search.yahoo.com/search?p=${encoded}`)
        })).then(results => {
            const linksCount = req.body.linksCount || 5;
            const allLinks = [];
            req.body.price = `${results.length}$`;
            results.forEach(searchRes => {
                const root = html.parse(searchRes.data);
                let links = root.querySelectorAll('.ac-algo').map(link => link.rawAttrs);
                links = links.map(link => {
                    const start = link.indexOf('href="') + 6;
                    let end;
                    for (var i = start; i < link.length; i++) {
                        if (link[i] === '"') {
                            end = i;
                            break;
                        }
                    }

                    return link.substring(start, end);
                });

                allLinks.push(...links.slice(0, linksCount));  
                req.body.links = allLinks;
                Product.findByIdAndUpdate(req.params.id, req.body).then(() => {
                    res.status(200).json(req.body);
                });
            });
        });
    } else {

        if (req.body.status === productStatuses.waitingPayment) {
            User.findById(req.body.ownerId).then(user => {
                mailer.sendProductReviewed(user.email);
            });
        } else if (req.body.status === productStatuses.rejected) {
            User.findById(req.body.ownerId).then(user => {
                mailer.sendProductRejected(user.email);
            });
        }
    
        Product.findByIdAndUpdate(req.params.id, req.body).then(result => {
            res.status(200).json(req.body);
        });
    }
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