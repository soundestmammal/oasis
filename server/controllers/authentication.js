const jwt = require('jwt-simple');
const key = require('../config/keys');
const User = require('../models/user');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, key.secret);
}

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email}, (err, existingUser) => {

        if (!email || !password) {
            return res.status(422).send({ error: 'You must provide an email and a password.'});
        }

        if (err) { return next(err); }
        
        if(existingUser) {
            return res.status(422).send({ error: 'Email is already in use' });
        }

        const user = new User({ email: email, password: password });

        user.save(function(err) {
            if (err) { return next(err); }
            res.json({ token: tokenForUser(user) });
        });
    });
}