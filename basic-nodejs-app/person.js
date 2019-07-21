module.exports = function (firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.getFullname = () => {
        if (typeof this.firstname == 'undefined' || this.firstname == null || this.firstname === '') {
            return this.lastname;
        }
        if (typeof this.lastname == 'undefined' || this.lastname == null || this.lastname === '') {
            return this.firstname;
        }
        return this.firstname + ", " + this.lastname;
    };
    this.fullname = this.getFullname();
    this.printInfor = () => {
        console.log('firstname=' + this.firstname);
        console.log('lastname=' + this.lastname);
        console.log('fullname=' + this.fullname)
    }
    this.setFirstname = firstname => {
        this.firstname = firstname;
    }
    this.setLastName = lastname => {
        this.lastname = lastname;
    }
}

// test this in server.js