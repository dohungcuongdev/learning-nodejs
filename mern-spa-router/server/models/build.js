var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var BuildSchema = new Schema(
    {
        repository: { type: String, default: '', required: true },
        build_count: { type: Number, default: 0, required: true },
        created_at: { type: Date, default: new Date() }
    },
    {
        collection: 'build'
    }
);

var build = module.exports = mongoose.model('build', BuildSchema);