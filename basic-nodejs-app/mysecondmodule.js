const sum = (a, b) => a + b;
const PI = 3.14

class Car {
    constructor(brand) {
        this._carname = brand;
    }
    get carname() {
        return this._carname;
    }
    set carname(x) {
        this._carname = x;
    }
    static hello() {
        return "Hello!!";
    }
    present() {
        return 'I have a ' + this._carname;
    }
}

class Model extends Car {
    constructor(brand, mod) {
        super(brand);
        this.model = mod;
    }
    show() {
        return this.present() + ', it is a ' + this.model;
    }
}


const testCLassCar = () => {
    car1 = new Car("Ford");

    //Call 'hello()' on the class Car:
    console.log(Car.hello());

    //and NOT on the 'mycar' object:
    //console.log(mycar.hello());
    //this would raise an error.

    // To use the "car1" object inside the static method, you can send it as parameter.
    console.log(Car.hello(car1));

    car2 = new Model("Ford", "Mustang");
    console.log(car2.show());

    car3 = new Car("");
    car3.carname = "Volvo";
    console.log(car3.present());
}

module.exports = { sum, PI, Car, printSomething: testCLassCar }

// test this in server.js