const express = require('express');
const app = express();

app.get("/", function (httpRequest, httpResponse, next) {
    httpResponse.write("Hello");
    next(); //remove this and see what happens 
});

app.get("/", function (httpRequest, httpResponse, next) {
    httpResponse.write(" World !!!");
    httpResponse.end();
});

var mw = require('./my-middleware.js');
app.use(mw({ option1: '1', option2: '2' }));

// http://localhost:8080/testmw - test middleware
app.get('/testmw', mw({ option1: '11', option2: '22' })); // create middleware in another file

app.use((req, res, next) => { // another middleware
    req.mwData = {mes: 'I am middleware'}; // pass middleware to next executioner
    console.log('any users request get processed by this middleware');
    next();
})

app.use('/testmw', (req, res, next) => { // another middleware
    req.testmwData = {mes: 'I am testmw middleware'}; // pass middleware to next executioner
    console.log('only request /testmw get processed by this middleware');
    next();
})

app.get('/testmw', (req, res) => {
    console.log('testmw route');
    res.send(req.mwData.mes+' '+req.testmwData.mes); // print data from above middlewares
})

const path = require('path')
app.use('/public', express.static(path.join(__dirname, 'static')))
app.get('/form', (req, res) => { //http://localhost:8080/form
    res.sendFile(path.join(__dirname, 'static', 'form.html'))
})

app.get('/api/users', (req, res) => { // http://localhost:8080/api/users
    res.send([{ id: 1, username: 'cuong' }, { id: 2, username: 'meepo' }])
})

// use route params when you must need to have to id and username
app.get('/api/users/:id/:username', (req, res) => { // http://localhost:8080/api/users/1/cuong
    const id = req.params.id
    const username = req.params.username
    res.send({ id: id, username: username })
})

// use route query when id and usernam are not mandatory
app.get('/api/user', (req, res) => { // http://localhost:8080/api/user?id=1&username=cuong
    const id = req.query.id
    const username = req.query.username
    res.send({ id, username })
})

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// post
app.post('/fullname', (req, res) => {
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    res.send('successfully posted data - fullname=' + (fname + lname))
})

// Form -  // http://localhost:8080/form
// form post JSON
app.use(bodyParser.json())
app.post('/postJson', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    res.json({ success: true, fullname: fname + lname })
})

// validate form
const joi = require('joi');
app.post('/validate', (req, res, next) => {
    const schema = joi.object().keys({
        email: joi.string().trim().email().required(),
        password: joi.string().min(5).max(10).required()
    })
    joi.validate(req.body, schema, (err, result) => {
        if (err) {
            next(err)
        } else {
            res.json({ success: true, result })
        }
    })
})


// ejs
const VIEW_DIR = 'views';
const VIEW_FILE_EXTENTION = 'ejs';
const VIEW_RESOUCE_DIR = 'public';

// view engine setup - ejs views
app.set('views', path.join(__dirname, VIEW_DIR));
app.set('view engine', VIEW_FILE_EXTENTION);

// ejs public
app.use(express.static(path.join(__dirname, VIEW_RESOUCE_DIR)));

app.get('/my-ejs-view', (req, res) => { // http://localhost:8080/my-ejs-view
  let random_boolean = Math.random() >= 0.5; // random display data
  res.render('my-view', {title:'my-view', bodyData: random_boolean?'This is data rendered from server':'', footerData: 'Footer'});
});

// routes
const myRoute = require('./routes/my-route');
app.use('/routes', myRoute); // http://localhost:8080/routes/...

app.listen(8080)