module.exports = function (options) {
    return function (req, res, next) {
        // Implement the middleware function based on the options object
        console.log('hello form my-middleware');
        console.log('option1='+options.option1);
        console.log('option2='+options.option2);
        next();
    }
}