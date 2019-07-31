const routes = require('express').Router();
const users = require('./users');
const eslint = require('./eslint');
const scan = require('./scan');
const build = require('./build');
const repository = require('./repository');
const file = require('./file');
const problem = require('./problem');

routes.use('/users', users);
routes.use('/eslint', eslint);
routes.use('/scan', scan);
routes.use('/api/builds', build);
routes.use('/api/repository', repository);
routes.use('/api/files', file);
routes.use('/api/problems', problem);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;