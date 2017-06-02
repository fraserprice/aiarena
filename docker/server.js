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

app.get('/', function(req, res) {
  res.send('Hello world\n');
});

app.post('/python', function(req, res) {
  var code = req.body.payload;
  fs.writeFile("code.py", code, function(err) {
    if(err) {
        console.log("ffs");
        return console.log(err);
    }

    console.log("The file was saved!");
  });

  var python = require('child_process').spawn('python', ["code.py"]);
  var output = "";
  python.stdout.on('data', function(data) {output += data});
  python.on('close', function(code){
    fs.unlinkSync("code.py");
    if (code !== 0) {
      return res.send(500, code);
    }
    return res.send(200, output);
  });
});

app.listen(PORT);
