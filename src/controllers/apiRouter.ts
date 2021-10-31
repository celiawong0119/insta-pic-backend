import express from 'express';
import verifyJwt from '../middlewares/verifyJwt';

import authRouter from './auth/authRouter';
import postsRouter from './posts/postsRouter';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/posts', verifyJwt, postsRouter);

export default apiRouter;
