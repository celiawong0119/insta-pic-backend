import express from 'express';
import jwt from 'jsonwebtoken';
import { JWTKey } from '../controllers/auth/authRouter';

const verifyJwt = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers['x-auth-token'] as string;

  if (!token) {
    res.status(401).send();
  } else {
    try {
      jwt.verify(token, JWTKey);
      next();
    } catch (e) {
      res.status(401).send();
    }
  }
};

export default verifyJwt;
