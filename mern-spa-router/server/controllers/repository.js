const buildModel = require('../models/build');
const { errHandler } = require('./');

exports.getRepositoryByNameAndBuild = function (request, response, next) {
    let query = request.query;
    if (!query || !query.name || !query.build || !isInt(query.build)) {
        response.status(400).json({error: 'Bad request: Name must be not null, build must be a number'});
        return;
    }
    let build_count = parseInt(query.build);
    buildModel.find({ repository: query.name, build_count }).then((repository) => {
        response.status(200).json(repository);
    }, e => errHandler(response, e));
}

function isInt(value) {
    return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}