var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var EslintSchema = new Schema(
    {
        declaration: { type: Object, default: {}, required: true },
        elements: { type: Object, default: {}, required: true },
    },
    {
        collection: 'eslint'
    }
);

var eslint = module.exports = mongoose.model('eslint', EslintSchema);

module.exports.getDataPromise = function () {
    return eslint.find();
}

module.exports.getDataByIDPromise = function (id) {
    return eslint.findById(id);
}