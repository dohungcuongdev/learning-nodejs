const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
var cors = require('cors');

const { DB } = require('./config');
console.log(DB)

const port = process.env.PORT || 8080;
const app = express();

// simple enable all CORS - need to declare before routes
app.use(cors());
app.options('*', cors());

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
    mongoose.set('useFindAndModify', false); // avoid warning when using findAndUpdate
    return mongoose.connect(DB, { keepAlive: 1, useNewUrlParser: true });
}