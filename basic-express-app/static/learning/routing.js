// Routing refers to how an application’s endpoints (URIs) respond to client requests
/*
You define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests and app.post to handle POST requests. For a full list, see app.METHOD. You can also use app.all() to handle all HTTP methods and app.use() to specify middleware as the callback function (See Using middleware for details).
These routing methods specify a callback function (sometimes called “handler functions”) called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.
In fact, the routing methods can have more than one callback function as arguments. With multiple callback functions, it is important to provide next as an argument to the callback function and then call next() within the body of the function to hand off control to the next callback.
*/

var express = require('express')
var app = express()

//Here are some examples of route paths based on strings.

//This route path will match requests to the root route, /.
app.get('/', function (req, res) {
    res.send('root')
})

//This route path will match requests to /about.
app.get('/about', function (req, res) {
    res.send('about')
})

//This route path will match requests to /random.text.
app.get('/random.text', function (req, res) {
    res.send('random.text')
})



//Here are some examples of route paths based on string patterns.

//This route path will match acd and abcd.
app.get('/ab?cd', function (req, res) {
    res.send('ab?cd')
})

//This route path will match abcd, abbcd, abbbcd, and so on.
app.get('/ab+cd', function (req, res) {
    res.send('ab+cd')
})

//This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
app.get('/ab*cd', function (req, res) {
    res.send('ab*cd')
})

//This route path will match /abe and /abcde.
app.get('/ab(cd)?e', function (req, res) {
    res.send('ab(cd)?e')
})



//Examples of route paths based on regular expressions:

//This route path will match anything with an “a” in it.
app.get(/a/, function (req, res) {
    res.send('/a/')
})

//This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, function (req, res) {
    res.send('/.*fly$/')
})


/*
Route handlers
You can provide multiple callback functions that behave like middleware to handle a request. The only exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks. You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.
Route handlers can be in the form of a function, an array of functions, or combinations of both, as shown in the following examples.
A single callback function can handle a route. For example:
*/

app.get('/example/a', function (req, res) {
    res.send('Hello from A!')
})

//More than one callback function can handle a route(make sure you specify the next object).For example:
app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from B!')
})


//An array of callback functions can handle a route.For example:
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

var cb2 = function (req, res) {
    res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])


//A combination of independent functions and arrays of functions can handle a route.For example:
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from D!')
})

/*
Response methods
The methods on the response object (res) in the following table can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging.

Method	Description
res.download()	Prompt a file to be downloaded.
res.end()	End the response process.
res.json()	Send a JSON response.
res.jsonp()	Send a JSON response with JSONP support.
res.redirect()	Redirect a request.
res.render()	Render a view template.
res.send()	Send a response of various types.
res.sendFile()	Send a file as an octet stream.
res.sendStatus()	Set the response status code and send its string representation as the response body.
*/

/*
express.Router
Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

The following example creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.

Create a router file named birds.js in the app directory, with the following content:
*/
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/', function (req, res) {
    res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
    res.send('About birds')
})

module.exports = router
//Then, load the router module in the app:

var birds = require('./birds')

// ...

app.use('/birds', birds)
//The app will now be able to handle requests to /birds and /birds/about, as well as call the timeLog middleware function that is specific to the route.