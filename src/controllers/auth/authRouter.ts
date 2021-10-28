import express from 'express';
import jwt from 'jsonwebtoken';

import { findUserByUsername, findUserByUserId } from '../../services/findUser';
import {
  generateHashedPassword,
  verifyPassword,
  getExpireDateInUnixTimeFormat,
} from '../../utils/authUtils';
import { getDatabase, writeToDatabase } from '../../utils/databaseUtils';
import verifyJwt from '../../middlewares/verifyJwt';

interface AuthPayload {
  username: string;
  password: string;
}

interface AuthResponse {
  jwtToken: string;
  jwtTokenExpires: number;
  data: {
    id: number;
    username: string;
    posts: number[];
  };
}

type ErrorResponse = string;

const router = express.Router();

export const JWTKey = 'JWTKey_insta_pic';

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
        if (await verifyPassword(password, foundUser.password)) {
          const exp = getExpireDateInUnixTimeFormat();
          const jwtToken = jwt.sign({ id: foundUser.id, exp: exp }, JWTKey);

          // password match
          res.status(200).send({
            jwtToken: jwtToken,
            jwtTokenExpires: exp,
            data: { id: foundUser.id, username: foundUser.username, posts: foundUser.posts },
          });
        } else {
          // password incorrect
          res.status(401).send('Incorrect password');
        }
      } else {
        // user is not found
        res.status(404).send('Username not found');
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
      const database = getDatabase();

      if (foundUser) {
        // user is found
        res.status(422).send('Username already been used');
      } else {
        // user is not found
        const hashedPassword = await generateHashedPassword(password);

        const newUser = {
          id: database.users.length + 1,
          username: username,
          password: hashedPassword,
          posts: [],
        };
        database.users.push(newUser);
        writeToDatabase(JSON.stringify(database));

        const exp = getExpireDateInUnixTimeFormat();
        const jwtToken = jwt.sign({ id: newUser.id, exp: exp }, JWTKey);

        res.status(200).send({
          jwtToken: jwtToken,
          jwtTokenExpires: exp,
          data: { id: newUser.id, username: newUser.username, posts: newUser.posts },
        });
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
      const decoded = jwt.verify(token, JWTKey) as {
        id: number;
        jwtTokenExpires: number;
        iat: number;
      };
      const userId = decoded.id;
      const foundUser = findUserByUserId(userId);

      if (foundUser) {
        const exp = getExpireDateInUnixTimeFormat();
        const jwtToken = jwt.sign({ id: foundUser.id, exp: exp }, JWTKey);

        res.status(200).send({
          jwtToken: jwtToken,
          jwtTokenExpires: exp,
          data: { id: foundUser.id, username: foundUser.username, posts: foundUser.posts },
        });
      }
    } catch (e) {
      res.status(401).send('Verify token error');
    }
  }
);
export default router;
