var fs = require('fs');
const { errHandler } = require('./');
const scan = require('./scan');
var Client = require('node-rest-client').Client;
var client = new Client();

exports.getData = function (request, response) {
    const JSON_FILE_DIR = './json/eslint-test.json';
    fs.readFile(JSON_FILE_DIR, 'utf8', function (err, data) {
        if (err) errHandler(response, err)
        const eslintData = JSON.parse(data);
        response.status(200).json(scan.getScannedData(eslintData));
    });
};

exports.getDataFromAnotherServer = function (request, response) {
    const JSON_URL = 'http://localhost:8081/scan/eslint-test.json';
    client.get(JSON_URL, function (data, res) {
        response.status(200).json(scan.getScannedData(data));
    }).on('error', function (err) {
        errHandler(response, err)
    });
};