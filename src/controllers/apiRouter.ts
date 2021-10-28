import express from 'express';
import verifyJwt from '../middlewares/verifyJwt';

import authRouter from './auth/authRouter';
import postsRouter from './posts/postsRouter';
// import userRouter from './user/userRouter';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/posts', verifyJwt, postsRouter);
// apiRouter.use('/users', userRouter);

export default apiRouter;
