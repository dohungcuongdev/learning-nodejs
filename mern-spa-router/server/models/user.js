var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var UserSchema = new Schema(
    {
        name: { type: String, default: '', required: true },
        username: { type: String, default: '', required: true },
    },
    {
        collection: 'users'
    }
);


// Pre hook for save`
UserSchema.pre('save', function (next) { // must stand above mongoose.model(...
    // do stuff
    console.log('before save');
    next();

});

// Pre hook for `findOneAndUpdate`
UserSchema.pre('findOneAndUpdate', function (next) { // must stand above mongoose.model(...
    // do stuff
    this.options.runValidators = true; // allow validation for findOneAndUpdate
    console.log('before findOneAndUpdate');
    next();
});

var users = module.exports = mongoose.model('users', UserSchema);


UserSchema.path('username').validate(function (username) {
    return username.length;
}, 'Username cannot be blank');


UserSchema.path('name').validate(function (name) {
    return name.length;
}, 'Name cannot be blank');

module.exports.getUsers = function (callbackAction) {
    users.find(callbackAction);
}

module.exports.getUsersPromise = function () {
    return users.find();
}

//function get user by username
module.exports.getUserByUsername = function (username, callbackAction) {
    var query = { username: username };
    users.findOne(query, callbackAction);
};

module.exports.getUserByUsernamePromise = function (username) {
    var query = { username: username };
    return users.findOne(query);
};

module.exports.addUser = function (newuser, callbackAction) {
    newuser.save(callbackAction);
};

module.exports.addUserPromise = function (newuser) {
    return newuser.save();
};

module.exports.updateNameOfUser = function (username, name, callbackAction) {
    const filter = { username };
    const update = { name };
    users.findOneAndUpdate(filter, update, callbackAction);
};