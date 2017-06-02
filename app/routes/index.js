const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/runpy', function (req, res) {
  const code = req.body.code;
  const resultStream = new stream.Writable();
  resultStream._write = function (chunk, encoding, done) {
    console.log(chunk.toString());
    done();
  };

  docker.run('pydock', ['bash', '-c', 'python -c \"' + code + '\"'], resultStream, function (err, dt, container) {
  });
});

module.exports = router;
