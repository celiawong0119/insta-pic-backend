import express from 'express';
import jwt from 'jsonwebtoken';

import database from '../../database/database.json';
import findUserByUsername from '../../services/findUserByUsername';
import {
  generateHashedPassword,
  verifyPassword,
  expireDateInUnixTimeFormat,
} from '../../utils/authUtils';
import { writeToDatabase } from '../../utils/databaseUtils';

const router = express.Router();

const JWTKey = 'JWTKey_insta_pic';

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = findUserByUsername(username);

    if (foundUser) {
      // user is found
      if (await verifyPassword(password, foundUser.password)) {
        const jwtToken = jwt.sign(
          { id: foundUser.id, jwtTokenExpires: expireDateInUnixTimeFormat },
          JWTKey
        );

        // password match
        res.status(200).send({
          jwtToken: jwtToken,
          jwtTokenExpires: expireDateInUnixTimeFormat,
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
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = findUserByUsername(username);

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

      const jwtToken = jwt.sign(
        { id: newUser.id, jwtTokenExpires: expireDateInUnixTimeFormat },
        JWTKey
      );

      res.status(200).send({
        jwtToken: jwtToken,
        jwtTokenExpires: expireDateInUnixTimeFormat,
        data: { id: newUser.id, username: newUser.username, posts: newUser.posts },
      });
    }
  } catch (e) {
    res.status(500).send('Signup error');
  }
});

export default router;
