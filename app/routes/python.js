const express = require('express');
const router = express.Router();
const Stream = require('stream');
const Docker = require('dockerode');

router.post('/', function (req, res) {
    var code = req.body.payload;
    var stream = new Stream.Writable();
    var docker = Docker();
    stream._write = function (chunk, encoding, done) {
        console.log(chunk.toString());
        done();
    };

    docker.run('pydock', ['bash', '-c', 'python -c \"' + code + '\"'], stream, function (err, dt, container) {
    });
});

module.exports = router;
