const express = require('express');
const app = express();

const port = 4000;

app.use(function (req, res, next) {
  var filename = path.basename(req.url);
  console.log('The file ' + filename + ' was requested.');
  next();
});

// expose public folder to anyone
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
