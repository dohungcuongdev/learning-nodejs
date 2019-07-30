var express = require('express');
var router = express.Router();
var buildCtril = require('../controllers/build');

router.get('/', buildCtril.getData);

module.exports = router;