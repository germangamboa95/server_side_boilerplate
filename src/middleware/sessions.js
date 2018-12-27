module.exports = function (mongoose, session, uid, MongoStore) {
    return session({
        secret: 'keyboard cat',
        cookie: {},
        resave: true,
        saveUninitialized: true,
        genid: () => uid(),
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
}