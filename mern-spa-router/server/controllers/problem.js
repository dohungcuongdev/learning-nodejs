const scannedProblemModle = require('../models/scanned_problem');
const { errHandler } = require('./');

exports.getProblemByFileNameRepositoryAndBuild = function (request, response, next) {
    let query = request.query;
    if (!query || !query.repository || !query.file || !query.build || !isInt(query.build)) {
        response.status(400).json({ error: 'Bad request: Repository must be not null, build must be a number' });
        return;
    }
    let build_count = parseInt(query.build);
    scannedProblemModle.find({ repository: query.repository, build_count, file_name: decodeURIComponent(query.file) }).then((files) => {
        response.status(200).json(files);
    }, e => errHandler(response, e));
}

function isInt(value) {
    return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}