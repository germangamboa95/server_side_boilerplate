const User = require('./model');

module.exports = {
    ...User,
    createNewUser: function (username, password, done) {
        console.log(User, 'yep')

        User.findOne({
            email: username
        }, function (err, user) {

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
}