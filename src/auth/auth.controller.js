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
        const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
        res.status(200).send({token, user: _.omit(user.toObject(), ['password', 'isAdmin', '__v'])});
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
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, config.secret, { expiresIn: 86400 });
            return res.status(200).send({ token, user: _.omit(user.toObject(), ['password', '__v'])});
        }
    })
}

function me(req, res) {
    User.findById(req.userId).then(user => {
        user = user.toObject();
        user.accountPlus = user.address && user.phone && user.agree
        res.json(_.omit(user, ['password', '__v']));
    });
}

function updateUser(req, res) {
    const userUpdate = req.body;
    
    if (userUpdate.password) {
        userUpdate.password = bcrypt.hashSync(userUpdate.password, 8);
    }

    if (req.file) {
        userUpdate.avatarUrl = `${req.protocol}://${req.host}/profile-avatars/${req.file.filename}`;
    }

    User.findByIdAndUpdate(req.userId, userUpdate).then(user => {
        res.status(200).json(_.omit(userUpdate, 'avatar'));
    });
}

module.exports = {
    register,
    login,
    updateUser,
    me
}