const User = require('../models/user');

module.exports.renderSignUp = (req, res) => {
    res.render('users/signup');
};

module.exports.signup = async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        let newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            } else {
                req.flash('success', 'Welcome to Heavens Abode!');
                res.redirect('/listings');
            }
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back to Heavens Abode');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        } else {
            req.flash('success', 'Logged out successfully!');
            res.redirect('/listings');
        }
    })
};