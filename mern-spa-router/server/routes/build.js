var express = require('express');
var router = express.Router();
var buildCtril = require('../controllers/build');
var buildScanProblemCtril = require('../controllers/readJsonToUpdate');

router.get('/', buildCtril.getAllBuilds);
router.get('/getData', buildCtril.getData);
router.get('/readJsonAndUpdate', buildScanProblemCtril.readJsonAndUpdate);

module.exports = router;