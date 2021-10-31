import express from 'express';

import login from './login';
import signup from './signup';
import verifyToken from './verifyToken';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/verifyToken', verifyToken);

export default router;
