import express from 'express';

import { findUserByUsername } from '../../services/userServices';
import { verifyPassword, constructAuthResponseWithJwt, AuthResponse } from '../../utils/authUtils';

interface LoginPayload {
  username: string;
  password: string;
}

type ErrorResponse = string;

const login = async (
  req: express.Request<never, never, LoginPayload, never>,
  res: express.Response<AuthResponse | ErrorResponse>
) => {
  try {
    const { username, password } = req.body;
    const foundUser = findUserByUsername(username);

    if (foundUser) {
      const isPasswordCorrect = await verifyPassword(password, foundUser.password);
      isPasswordCorrect
        ? res.status(200).send(constructAuthResponseWithJwt(foundUser))
        : res.status(401).send('Incorrect password');
    } else {
      res.status(401).send('Username not found');
    }
  } catch (e) {
    res.status(500).send('Login error');
  }
};

export default login;
