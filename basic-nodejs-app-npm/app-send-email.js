var nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Fix Error: self signed certificate in certificate chain
// Also need to confirm it is you in your email
// Also need to Alow Less secure app access
// this link https://myaccount.google.com/lesssecureapps
// still not work then try https://accounts.google.com/b/0/DisplayUnlockCaptcha

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kimlong19951995@gmail.com',
        pass: 'ititiu13170'
    }
});

var normalMailOptions = {
    from: 'kimlong19951995',
    to: 'cuongvip1295@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

// Multiple Receivers
var multipleReceiversMailOptions = {
    from: 'kimlong19951995',
    to: 'cuongvip1295@gmail.com, dohungcuongdev1295@gmail.com',
    subject: 'Sending Multiple Receivers Email using Node.js',
    text: 'That was easy!'
}

// Send email containing HTML:
var htmlMailOptions = {
    from: 'kimlong19951995',
    to: 'cuongvip1295@gmail.com',
    subject: 'Sending HTML Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
}

const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports.createServer = function (req, res) {
    sendMail(normalMailOptions);
    sendMail(multipleReceiversMailOptions);
    sendMail(htmlMailOptions);
    return res.end();
}