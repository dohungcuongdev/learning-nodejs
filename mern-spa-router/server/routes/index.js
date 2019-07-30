const routes = require('express').Router();
const users = require('./users');
const eslint = require('./eslint');
const scan = require('./scan');
const build = require('./build');

routes.use('/users', users);
routes.use('/eslint', eslint);
routes.use('/scan', scan);
routes.use('/build', build);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;