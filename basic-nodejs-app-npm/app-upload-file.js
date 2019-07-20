var http = require('http');
var formidable = require('formidable'); // There is a very good module for working with file uploads, called "Formidable". The Formidable module can be downloaded and installed using NPM. After you have downloaded the Formidable module, you can include the module in any application
var fs = require('fs');

module.exports.createServer = function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err)
                throw err;
            console.log("The file has be uploaded, and placed on a temporary folder");

            /*
              The path to this directory can be found in the "files" object, passed as the third argument in the parse() method's callback function.
              To move the file to the folder of your choice, use the File System module, and rename the file:
            */
            var oldpath = files.filetoupload.path;
            var newpath = 'C:/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}