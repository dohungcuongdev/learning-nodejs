var express = require('express');
var router = express.Router();
var scanCtril = require('../controllers/scan');
var readjsonCtril = require('../controllers/readjson');
var updateScannedCtril = require('../controllers/updateScanned');
const JSON_TEST_FILE = require('../json/eslint-test.json');

router.get('/', scanCtril.getData);
router.get('/readjson', readjsonCtril.getData);
router.get('/readjson/from-another-server', readjsonCtril.getDataFromAnotherServer);
router.get('/getDataAndUpdateScanned', updateScannedCtril.getDataAndUpdateScanned);

router.get('/eslint-test.json', (req, res) => {
    res.status(200).json(JSON_TEST_FILE);
});

module.exports = router;