var http = require('http'); // Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).
var dt = require('./myfirstmodule'); // You can create your own modules, and easily include them in your applications.
var Person = require('./person');
var FileSystem = require('./file-system-module');

 // In the JavaScript, a function can be treated like a class. The following example exposes a function which can be used like a class.
var docuong = new Person('Do', 'Cuong');
var fileSystem = new FileSystem();

// The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.
// Use the createServer() method to create an HTTP server:
http.createServer(async function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.write(docuong.firstname);
  res.write(docuong.lastname);
  res.write(docuong.fullname);
  docuong.printInfor();
  docuong.setFirstname("Do Hung");
  docuong.setLastName("Cuong Meepo");
  res.write(await handleFile.getData());
  res.end();
}).listen(8080);

const handleFile = {
  getData: async () => {
    let fileName = 'hello.txt';
    let res1 = await fileSystem.createFile(fileName);
    console.log(res1);
    let res2 = await fileSystem.appendFile(fileName, 'Hello World');
    console.log(res2);
    let res3 = await fileSystem.readFile(fileName);
    console.log(res3);
    let newfileName = 'helloworld.txt';
    let res4 = await fileSystem.rename(fileName, newfileName);
    console.log(res4);
    let res5 = await fileSystem.deleteFile(newfileName);
    console.log(res5);
    return res3;
  }
}

console.log("Server is running on http://localhost:8080");