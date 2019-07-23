const express = require('express');
const app = express();

app.get('/', (req, res) => { //http://localhost:8080/
    res.send('index route')
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

// post
app.post('/fullname', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    res.send('successfully posted data - fullname=' + (fname + lname))
})

// form post JSON
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
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
        if(err) {
            next(err)
        } else {
            res.json({ success: true, result })
        }
    })
})

app.listen(8080)