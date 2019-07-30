var Client = require('node-rest-client').Client;

var client = new Client();

exports.example = function () {
    // direct way
    client.get("http://remote.site/rest/xml/method", function (data, response) {
        // parsed response body as js object
        console.log(data);
        // raw response
        console.log(response);
    });

    // registering remote methods
    client.registerMethod("jsonMethod", "http://remote.site/rest/json/method", "GET");

    client.methods.jsonMethod(function (data, response) {
        // parsed response body as js object
        console.log(data);
        // raw response
        console.log(response);
    });
}

exports.getJsonSimple = function (jsonURL) {
    client.get(jsonURL, function (data, response) {
        // parsed response body as js object
        console.log(data);
        // raw response
        console.log(response);
    });
}

exports.getJson = function (jsonURL) {
    // handling request error events
    client.get(jsonURL, function (data, response) {
        // parsed response body as js object
        console.log(data);
        // raw response
        console.log(response);
    }).on('error', function (err) {
        console.log('something went wrong on the request', err.request.options);
    });
}