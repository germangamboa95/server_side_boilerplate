module.exports = {
    sessions: require('./sessions'),
    static: (express, path) => express.static(path.join(__dirname, 'public'))
}