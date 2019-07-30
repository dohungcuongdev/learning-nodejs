const userModel = require('../models/user')
const { commonHandleGetApi, commonHandlePostApi, commonHandlePutApi, errHandler } = require('./');

exports.getUsers = function (request, response) {
    userModel.getUsers(function (err, resource) {
        commonHandleGetApi(response, err, resource);
    });
};

// the same goal as above function but using promise
exports.getAllUsers = function (request, response) {
    userModel.getUsersPromise().then(function (resource) {
        response.status(200).json(resource);
    }, err => errHandler(response, err));
};

exports.getUserByUsername = function (request, response) {
    userModel.getUserByUsername(request.params.username, function (err, resource) {
        commonHandleGetApi(response, err, resource);
    });
};

exports.addUser = function (request, response) {
    const username = request.query.username;
    userModel.getUserByUsername(username, (err, resource) => {
        if (err) {
            response.status(500).json(err);
        } else if (resource != null) {
            response.status(400).json({ error: 'Username is already existed' });
        } else {
            const newUser = new userModel({ username, name: request.query.name });
            userModel.addUser(newUser, function (error, res) {
                commonHandlePostApi(response, error, res);
            });
        }
    });
};

// the same goal as above function but using promise
exports.addNewUser = function (request, response) {
    const username = request.query.username;
    userModel.getUserByUsernamePromise(username).then(resource => {
        if (resource != null) {
            response.status(400).json({ error: 'Username is already existed' });
        } else {
            const newUser = new userModel({ username, name: request.query.name });
            return userModel.addUserPromise(newUser);
        }
    }).then(result => {
        response.status(200).json(result);
    }).catch(e => {
        response.status(500).json(e);
    })
};

exports.updateNameOfUser = function (request, response) {
    const username = request.query.username;
    const name = request.query.name;
    userModel.updateNameOfUser(username, name, function (error, resouce) {
        commonHandlePutApi(response, error, resouce);
    })

};

// the same goal as above function but using promise
exports.editNameOfUser = function (request, response) {
    const username = request.query.username;
    const name = request.query.name;
    userModel.findOneAndUpdate({ username }, { name }).then(function (result) {
        response.status(200).json(result);
    }, function (err) { errHandler(response, err) });
};