var express = require('express');
var router = express.Router();
var problemCtrl = require('../controllers/problem');

router.get('/', problemCtrl.getProblemByFileNameRepositoryAndBuild);

module.exports = router;