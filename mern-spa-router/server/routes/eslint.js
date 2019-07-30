var express = require('express');
var router = express.Router();
var eslintCtrl = require('../controllers/eslint');

router.get('/', eslintCtrl.getData);

module.exports = router;