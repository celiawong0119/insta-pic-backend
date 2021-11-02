import express from 'express';
import cors from 'cors';
import apiRouter from './controllers/apiRouter';

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req);
  next();
});

// set up cors for dev to "Origin is not allowed by Access-Control-Allow-Origin" error
// use white list for production
app.use(
  cors({
    exposedHeaders: ['x-auth-token'],
  })
);

app.use('/api', apiRouter);

const port = process.env.PORT || 4000;
app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}`);
});
