var fs = require('fs');

module.exports = function () {
    this.readFile = function (file) {
        return new Promise(function (resolve, reject) {
            fs.readFile(file, "utf8", function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        })
    }

    // Create a new file using the appendFile() method 
    this.createFile = function (file) {
        return new Promise(function (resolve, reject) {
            fs.appendFile(file, '', function (err) {
                if (err) reject(err);
                resolve('Created!');
            });
        })
    }

    // appendFile data to file
    this.appendFile = function (file, content) { 
        return new Promise(function (resolve, reject) {
            fs.appendFile(file, content, function (err) {
                if (err) reject(err);
                resolve('Appended!');
            });
        })
    }

    // The fs.open() method takes a "flag" as the second argument, if the flag is "w" for "writing", the specified file is opened for writing. If the file does not exist, an empty file is created:
    this.open = function (file) { 
        return new Promise(function (resolve, reject) {
            fs.open(file, 'w', function (err, file) {
                if (err) reject(err);
                resolve('Saved!');
            });
        })
    }

    // Replace content of the file
    this.writeFile = function (file, content) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(file, content, function (err) {
                if (err) reject(err);
                resolve('Replaced!');
            });
        })
    }

    this.deleteFile = function (file) {
        return new Promise(function (resolve, reject) {
            fs.unlink(file, function (err) {
                if (err) reject(err);
                resolve('Deleted!');
            });
        })
    }

    this.rename = function (file, newName) {
        return new Promise(function (resolve, reject) {
            fs.rename(file, newName, function (err) {
                if (err) reject(err);
                resolve('Renamed into '+newName);
            });
        })
    }

    // read an folder and return all the files in this folder
    this.readDirectory = function (fileDir) {
        return new Promise(function (resolve, reject) {
            fs.readdir(fileDir, function (err, files) {
                if (err) reject(err);
                resolve(files);
            });
        }) 
    }

    // can only remove empty folder
    this.removeDirectory = function (fileDir) {
        return new Promise(function (resolve, reject) {
            fs.rmdir(fileDir, function (err) {
                if (err) reject(err);
                resolve('Deleted');
            });
        }) 
    }
};

// test this in server.js