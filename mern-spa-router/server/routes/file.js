var express = require('express');
var router = express.Router();
var fileCtrl = require('../controllers/file');

router.get('/', fileCtrl.getFilesByRepoAndBuild);

module.exports = router;