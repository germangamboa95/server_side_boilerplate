const web = require('express').Router();
const controller = require('../controllers');
const passport = require('../middleware/passport')

console.log(controller)

let ensureAuthenticated =  function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect('/');
}


web.get('/', controller.Pages.show);
web.post('/user', controller.Pages.create);



web.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
}))

web.get('/home', ensureAuthenticated, (req, res) => {
    console.log(req.session.passport);
    res.render('pages/home')
});

// web.get('/', function (req, res) {
//     const sessData = req.session;

//     sessData.someAttribute = req.query.name;

//     console.log(req.session)
//     res.render('pages/index');
// });

// web.get('/bar', function (req, res, next) {
//     var someAttribute = req.session.someAttribute;

//     res.send(`This will print the attribute I set earlier: ${someAttribute}`);

// });
module.exports = web;