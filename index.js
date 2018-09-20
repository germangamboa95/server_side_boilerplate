const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');
const middleware = require('./middleware');
const session = require('express-session');
const uuidv1 = require('uuid/v1');
const MongoStore = require('connect-mongo')(session);


mongoose.connect('mongodb://localhost/benice');

app.set('view engine', 'ejs')

// Middleware
app.use(middleware.sessions(mongoose, session, uuidv1, MongoStore));

// Routes
app.use('/', routes.web)

// Static Folder

app.use('/public', middleware.static(express, path))

// Server 
const _PORT = process._PORT || 3000;

app.listen(_PORT, (err) => {
    if (err) throw err;
    console.log('Server running on', _PORT)
})