import express from 'express';
import cors from 'cors';
import apiRouter from './controllers/apiRouter';
import https from 'https';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(express.static('public'));

// set up cors for dev to "Origin is not allowed by Access-Control-Allow-Origin" error
// use white list for production
app.use(
  cors({
    exposedHeaders: ['x-auth-token'],
  })
);

app.use('/api', apiRouter);

console.log('NODE_ENV =', process.env.NODE_ENV);
console.log(__dirname + '/../selfsigned.key');
if (process.env.NODE_ENV === 'production') {
  const port = 80;
  let key = fs.readFileSync(__dirname + '/../certs/selfsigned.key');
  let cert = fs.readFileSync(__dirname + '/../certs/selfsigned.crt');
  let options = {
    key: key,
    cert: cert,
  };

  let server = https.createServer(options, app);
  server.listen(port, () => {
    console.log('server starting on port : ' + port);
  });
} else {
  const port = 4000;
  app.listen(port, () => {
    console.log('server starting on port : ' + port);
  });
}
