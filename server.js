const express = require('express');
<<<<<<< HEAD
//const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
//app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
=======
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
>>>>>>> f8e69c8103eb39224d9f099fd8ae260001e3c248
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);