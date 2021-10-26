import express from 'express';

import authRouter from './auth/authRouter';
// import userRouter from './user/userRouter';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
// apiRouter.use('/users', userRouter);

export default apiRouter;
