const express = require('express');
const app = express();
const {urlencoded, json} = express; 
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');
const middleware = require('./middleware');
const session = require('express-session');
const uuidv1 = require('uuid/v1');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const passport = require('passport')
mongoose.connect('mongodb://localhost/benice');

app.set('view engine', 'ejs')

// Middleware
app.use(middleware.sessions(mongoose, session, uuidv1, MongoStore));
app.use(urlencoded(), json(), flash())
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use('/', routes.web)
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

// Static Folder

app.use('/public', middleware.static(express, path))

// Server 
const _PORT = process._PORT || 3000;

app.listen(_PORT, (err) => {
    if (err) throw err;
    console.log('Server running on', _PORT)
}) 