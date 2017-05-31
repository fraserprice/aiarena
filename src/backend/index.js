const express = require('express')
const app = express()
const Docker = require('dockerode')
const docker = new Docker()
const bodyParser = require('body-parser')
const Stream = require('stream')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Landing page')
})

app.get('/login', function (req, res) {
    res.send('Login page')
})

app.post('/runpy', function (req, res) {
    var code = req.body.code
    var resultStream = new Stream.Writable();
    resultStream._write = function (chunk, encoding, done) {
        console.log(chunk.toString());
        done();
    };

    docker.run('pydock', ['bash', '-c', 'python -c \"' + code + '\"'], resultStream, function (err, dt, container) {
    });
})

app.get('/about', function (req, res) {
    res.send('About page')
})

app.listen(3000, function () {
    console.log('App listening on port 3000');
})