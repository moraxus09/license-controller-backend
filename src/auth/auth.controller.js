const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../app.config');
const User = require('./user.model');

function register(req, res) {
    const user = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 8)
    };

    User.create(user, (err, user) => {
        if (err) {
            return res.sendStatus(500);
        }
        const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
        res.status(200).send({token, user: _.omit(user.toObject(), 'password')});
    });
}

function login(req, res) {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            return res.sendStatus(500);
        } else if (!user) {
            return res.sendStatus(404);
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.sendStatus(422);
        } else {
            const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
            return res.status(200).send({token, user: _.omit(user.toObject(), 'password')});
        }
    })
}

function loginAsAdmin(req, res) { 

}

module.exports = {
    register,
    login,
    loginAsAdmin
}