const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


const config = {
    usernameField: 'user_email',
    passwordField: 'user_password'
}

const User = require('../components/User')

passport.use(new LocalStrategy(
    config,
    User.createNewUser
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


module.exports = passport;