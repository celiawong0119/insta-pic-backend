import express from 'express';
import jwt from 'jsonwebtoken';

import { findUserByUsername, findUserByUserId, createUser } from '../../services/userServices';
import {
  verifyPassword,
  constructAuthResponseWithJwt,
  JWT_KEY,
  AuthResponse,
} from '../../utils/authUtils';

interface AuthPayload {
  username: string;
  password: string;
}

type ErrorResponse = string;

const router = express.Router();

router.post(
  '/login',
  async (
    req: express.Request<never, never, AuthPayload, never>,
    res: express.Response<AuthResponse | ErrorResponse>
  ) => {
    try {
      const { username, password } = req.body;
      const foundUser = findUserByUsername(username);

      if (foundUser) {
        // user is found
        const isPasswordCorrect = await verifyPassword(password, foundUser.password);
        isPasswordCorrect
          ? res.status(200).send(constructAuthResponseWithJwt(foundUser))
          : res.status(401).send('Incorrect password');
      } else {
        // user is not found
        res.status(401).send('Username not found');
      }
    } catch (e) {
      console.log(e);
      res.status(500).send('Login error');
    }
  }
);

router.post(
  '/signup',
  async (
    req: express.Request<never, never, AuthPayload, never>,
    res: express.Response<AuthResponse | ErrorResponse>
  ) => {
    try {
      const { username, password } = req.body;
      const foundUser = findUserByUsername(username);

      if (foundUser) {
        // username is found
        res.status(422).send('Username already been used');
      } else {
        // username is not found
        const newUser = await createUser(username, password);
        res.status(200).send(constructAuthResponseWithJwt(newUser));
      }
    } catch (e) {
      res.status(500).send('Signup error');
    }
  }
);

router.post(
  '/verifyToken',
  async (req: express.Request, res: express.Response<AuthResponse | ErrorResponse>) => {
    try {
      const token = req.headers['x-auth-token'] as string;
      const decoded = jwt.verify(token, JWT_KEY) as {
        id: number;
        jwtTokenExpires: number;
        iat: number;
      };
      const userId = decoded.id;
      const foundUser = findUserByUserId(userId);

      if (foundUser) {
        res.status(200).send(constructAuthResponseWithJwt(foundUser));
      }
    } catch (e) {
      res.status(401).send('Verify token error');
    }
  }
);
export default router;
