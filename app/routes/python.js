const express = require('express');
const Stream = require('stream');
const Docker = require('dockerode');

const router = express.Router();

router.post('/', function (req, res) {
  var code = req.body.payload;
  code = code.replace(/"/g, "\'");
  const stream = new Stream.Writable();
  const docker = Docker();
  stream._write = function (chunk, encoding, done) {
    console.log(chunk.toString());
    done();
  };
  docker.run(
    'pydock',
    ['bash', '-c', 'python -c \"' + code + '\"'],
    stream,
    (err, dt, container) => {
    });
});

module.exports = router;
