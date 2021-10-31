import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../utils/authUtils';

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
      jwt.verify(token, JWT_KEY);
      next();
    } catch (e) {
      res.status(401).send();
    }
  }
};

export default verifyJwt;
