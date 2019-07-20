var http = require('http');
var appUploadFile = require('./app-upload-file');
var appSendEmail = require('./app-send-email');
var appMongoDB = require('./app-mongo-db');

// The arguments are stored in process.argv
process.argv.forEach(function (val, index, array) {
    //console.log(index + ': ' + val);
});

const MYAPP = (() => {
    //console.log(process.argv)
    switch(process.argv[2]) {
        case '1': return 'uploadfile';
        case '2': return 'sendemail';
        case '3': return 'mongodb';
        default: 
            console.log(`please try other commands: 
            ### App file upload
            - npm start 1
            
            ### App send email
            - npm start 2
            
            ### App mongdo DB
            - npm start 3`);
            return '';
    }
})();

console.log("App is running on localhost 8080")

http.createServer(function (req, res) {
    if (MYAPP == 'uploadfile') {
        appUploadFile.createServer(req, res);
    } else if (MYAPP == 'sendemail') {
        appSendEmail.createServer(req, res);
    } else if(MYAPP == 'mongodb') {
        appMongoDB.createServer(req, res);
    } else {
        return res.end();
    }

}).listen(8080);