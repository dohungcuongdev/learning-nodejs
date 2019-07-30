const eslintModel = require('../models/eslint')
const { errHandler } = require('./');

// the same goal as above function but using promise
exports.getData = function (request, response) {
    eslintModel.getDataPromise().then(function (resource) {
        response.status(200).json(resource);
    }, err => errHandler(response, err));
};