import express from 'express';
import cors from 'cors';
import apiRouter from './controllers/apiRouter';

const app = express();
app.use(express.json());
app.use(express.static('public'));

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
