const express = require('express');
const Stream = require('stream');
const Docker = require('dockerode');

const router = express.Router();

router.post('/', (req, res) => {
  let code = req.body.payload;
  code = code.replace(/"/g, "\'");
  const stream = new Stream.Writable();
  const docker = Docker();
  stream._write = (chunk, encoding, done) =>{
    console.log(chunk.toString());
    res.json({ payload: chunk.toString() });
    done();
  };
  docker.run(
    'pydock',
    ['bash', '-c', `python -c "${code}"`],
    stream,
    (err, dt, container) => {});
});

module.exports = router;
