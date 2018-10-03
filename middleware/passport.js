const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


const config = {
    usernameField: 'user_email',
    passwordField: 'user_password'
}

const User = require('../components/User/model')


passport.use(new LocalStrategy(config,
    function (username, password, done) {

        User.findOne({
            email: username
        }, function (err, user) {
            console.log(user)
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }
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