var fs = require('fs');

var readStream = fs.createReadStream('person.js');

// Every action on a computer is an event. Like when a connection is made or a file is opened.
// Objects in Node.js can fire events, like the readStream object fires events when opening and closing a file:
/*Write to the console when the file is opened:*/
const testEventFileOpened = () => {
    readStream.on('open', function () {
        console.log('The file is opened');
    });
}

// Events Module
// Node.js has a built-in module, called "Events", where you can create-, fire-, and listen for- your own events.
// To include the built-in Events module use the require() method. In addition, all event properties and methods are an instance of an EventEmitter object. To be able to access these properties and methods, create an EventEmitter object:
var events = require('events');
var eventEmitter = new events.EventEmitter();

// You can assign event handlers to your own events with the EventEmitter object.
// In the example below we have created a function that will be executed when a "scream" event is fired.
// To fire an event, use the emit() method.

//Create an event handler:
var myEventHandler = function () {
    console.log('I hear a scream!');
}

const testScreamEvent = () => {
    //Assign the eventhandler to an event:
    eventEmitter.on('scream', myEventHandler);
    //Fire the 'scream' event:
    eventEmitter.emit('scream');
}

const testSumEvent = () => {
    eventEmitter.on('sum', (a, b) => {
        console.log(a + b);
    })

    eventEmitter.emit('sum', 2, 3);
}

class MyEventEmitter extends events.EventEmitter {
    constructor(name) {
        super();
        this._name = name
    }

    get name() {
        return this._name;
    }
}

function testMyEventEmitter() {
    let myEventEmitterInstance1 = new MyEventEmitter('hello');
    let myEventEmitterInstance2 = new MyEventEmitter('greeting');
    myEventEmitterInstance1.on('printName', () => {
        console.log('MyEventEmitter name is ' + myEventEmitterInstance1.name)
    })
    myEventEmitterInstance2.on('printName', () => {
        console.log('MyEventEmitter name is ' + myEventEmitterInstance2.name)
    })
    // execute emit will do sequensely as synchonous
    myEventEmitterInstance1.emit('printName');
    myEventEmitterInstance2.emit('printName');
}



module.exports.testEventFileOpened = testEventFileOpened;
module.exports.testScreamEvent = testScreamEvent;
module.exports.testSumEvent = testSumEvent;
module.exports.testMyEventEmitter = testMyEventEmitter;

// test this in server.js