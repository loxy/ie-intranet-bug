const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

// Setup 3 pseudo app serving dist folder on static

for (let i=0; i<3; i++) {
  http.createServer(app).listen(15201 + i, function () {
    console.log(`Example app listening on port ${15201 + i}!`);
  });
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/static', express.static('dist'));

