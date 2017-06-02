/* node.js server for python sandbox in docker container */
/* Daniel Zvara, 2017 */

'use strict';

const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.post('/python', (req, res) => {
  const code = req.body.payload;
  fs.writeFile('code.py', code, (err) => {
    if (err) {
      console.log('ffs');
      return console.log(err);
    }

    console.log('The file was saved!');
  });

  const python = require('child_process').spawn('python', ['code.py']);
  let output = '';
  python.stdout.on('data', (data) => { output += data; });
  python.on('close', (code) => {
    fs.unlinkSync('code.py');
    if (code !== 0) {
      return res.send(500, code);
    }
    return res.send(200, output);
  });
});

app.listen(PORT);
