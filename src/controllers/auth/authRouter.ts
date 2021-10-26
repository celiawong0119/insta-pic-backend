import express from 'express';
import jwt from 'jsonwebtoken';
import { add, getUnixTime } from 'date-fns';

import database from '../../database/database.json';
import findUserByUsername from '../../services/findUserByUsername';
import { generateHashedPassword, verifyPassword } from '../../utils/authUtils';
import { writeToDatabase } from '../../utils/databaseUtils';

const router = express.Router();

const JWTKey = 'JWTKey_insta_pic';

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = findUserByUsername(username);
    const expireDate = add(Date.now(), { days: 7 });
    const expireDateInUnixTimeFormat = getUnixTime(expireDate);
    console.log(expireDate, expireDateInUnixTimeFormat);

    if (foundUser) {
      // user is found
      if (await verifyPassword(password, foundUser.password)) {
        const jwtToken = jwt.sign({ id: foundUser.id }, JWTKey);

        // password match
        res.status(200).send({
          jwtToken: jwtToken,
          jwtTokenExpires: expireDateInUnixTimeFormat,
          data: { id: foundUser.id, username: foundUser.username, posts: foundUser.posts },
        });
      } else {
        // password incorrect
        res.status(401).send();
      }
    } else {
      // user is not found
      res.status(404).send();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await findUserByUsername(username);

    if (foundUser) {
      // user is found
      res.status(401).send({ message: 'This username is already being used.' });
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

      const jwtToken = jwt.sign({ id: newUser.id }, JWTKey);

      res.header('jwt-token', jwtToken);
      res.status(200).send({
        id: newUser.id,
        username: newUser.username,
        posts: newUser.posts,
      });
    }
  } catch (e) {
    res.status(500).send({ message: 'Something went wrong when user log in!' });
  }
});

export default router;
