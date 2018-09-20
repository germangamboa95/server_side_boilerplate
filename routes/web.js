const web = require('express').Router();

web.get('/', function (req, res) {
    const sessData = req.session;

    sessData.someAttribute = req.query.name;

    console.log(req.session)
    res.render('pages/index');
});

web.get('/bar', function (req, res, next) {
    var someAttribute = req.session.someAttribute;

    res.send(`This will print the attribute I set earlier: ${someAttribute}`);


});
module.exports = web;