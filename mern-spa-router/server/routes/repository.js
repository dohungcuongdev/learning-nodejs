var express = require('express');
var router = express.Router();
var repositoryCtrl = require('../controllers/repository');

router.get('/', repositoryCtrl.getRepositoryByNameAndBuild);

module.exports = router;