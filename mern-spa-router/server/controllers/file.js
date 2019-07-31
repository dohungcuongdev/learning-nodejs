const scannedFileModel = require('../models/scanned_file');
const { errHandler } = require('./');

exports.getFilesByRepoAndBuild = function (request, response, next) {
    let query = request.query;
    if (!query || !query.repository || !query.build || !isInt(query.build)) {
        response.status(400).json({ error: 'Bad request: Repository must be not null, build must be a number' });
        return;
    }
    let build_count = parseInt(query.build);
    scannedFileModel.find({ repository: query.repository, build_count }, { file_name: 1 }).then((files) => {
        response.status(200).json(files);
    }, e => errHandler(response, e));
}

function isInt(value) {
    return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}