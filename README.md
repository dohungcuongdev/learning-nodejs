What is Node.js?
Node.js is an open source server environment
Node.js is free
Node.js runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)
Node.js uses JavaScript on the server
Why Node.js?
Node.js uses asynchronous programming!

A common task for a web server can be to open a file on the server and return the content to the client.

Here is how PHP or ASP handles a file request:

Sends the task to the computer's file system.
Waits while the file system opens and reads the file.
Returns the content to the client.
Ready to handle the next request.
Here is how Node.js handles a file request:

Sends the task to the computer's file system.
Ready to handle the next request.
When the file system has opened and read the file, the server returns the content to the client.
Node.js eliminates the waiting, and simply continues with the next request.

Node.js runs single-threaded, non-blocking, asynchronously programming, which is very memory efficient.

What Can Node.js Do?
Node.js can generate dynamic page content
Node.js can create, open, read, write, delete, and close files on the server
Node.js can collect form data
Node.js can add, delete, modify data in your database
What is a Node.js File?
Node.js files contain tasks that will be executed on certain events
A typical event is someone trying to access a port on the server
Node.js files must be initiated on the server before having any effect
Node.js files have extension ".js"



Synchronous vs Asynchronous
Synchronous execution usually refers to code executing in sequence. Asynchronous execution refers to execution that doesn't run in the sequence it appears in the code. In the following example, the synchronous operation causes the alerts to fire in sequence. In the async operation, while alert(2) appears to execute second, it doesn't.

Synchronous: 1,2,3

alert(1);
alert(2);
alert(3);

Asynchronous: 1,3,2

alert(1);
setTimeout(() => alert(2), 0);
alert(3);

Blocking vs Non-blocking
Blocking refers to operations that block further execution until that operation finishes. Non-blocking refers to code that doesn't block execution. In the given example, localStorage is a blocking operation as it stalls execution to read. On the other hand, fetch is a non-blocking operation as it does not stall alert(3) from execution.

// Blocking: 1,... 2
alert(1);
var value = localStorage.getItem('foo');
alert(2);

// Non-blocking: 1, 3,... 2
alert(1);
fetch('example.com').then(() => alert(2));
alert(3);
Advantages
One advantage of non-blocking, asynchronous operations is that you can maximize the usage of a single CPU as well as memory.

Synchronous, blocking example
An example of synchronous, blocking operations is how some web servers like ones in Java or PHP handle IO or network requests. If your code reads from a file or the database, your code "blocks" everything after it from executing. In that period, your machine is holding onto memory and processing time for a thread that isn't doing anything.

In order to cater other requests while that thread has stalled depends on your software. What most server software do is spawn more threads to cater the additional requests. This requires more memory consumed and more processing.

Asynchronous, non-blocking example
Asynchronous, non-blocking servers - like ones made in Node - only use one thread to service all requests. This means an instance of Node makes the most out of a single thread. The creators designed it with the premise that the I/O and network operations are the bottleneck.

When requests arrive at the server, they are serviced one at a time. However, when the code serviced needs to query the DB for example, it sends the callback to a second queue and the main thread will continue running (it doesn't wait). Now when the DB operation completes and returns, the corresponding callback pulled out of the second queue and queued in a third queue where they are pending execution. When the engine gets a chance to execute something else (like when the execution stack is emptied), it picks up a callback from the third queue and executes it.