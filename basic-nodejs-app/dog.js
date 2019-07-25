const Dog = function(name) {
    this.name = name;
    this.setName = (name) => {
        this.name = name;
    }
}

Dog.prototype.getName = function() {
    return this.name;
};

Dog.prototype.greeting = function() {
  console.log("gau gau gau");
};

Dog.prototype.getGreetingMes = function() {
    return "gau gau gau";
};

Dog.prototype.generalName = 'dog';

Dog.prototype.angryMes = (() => {
    return "grzuu gau";
})();

module.exports = Dog;