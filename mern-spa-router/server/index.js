const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { DB } = require('./config');
console.log(DB)

const port = process.env.PORT || 8080;
const app = express();

//  Connect all our routes to our application
app.use('/', routes);

connect();

function listen() {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Express app started on port ' + port);
}

function connect() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', listen);
    return mongoose.connect(DB, { keepAlive: 1, useNewUrlParser: true });
}