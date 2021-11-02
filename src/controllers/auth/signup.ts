import express from 'express';

import { findUserByUsername, createUser } from '../../services/userServices';
import { constructAuthResponseWithJwt, AuthResponse } from '../../utils/authUtils';

interface SignupPayload {
  username: string;
  password: string;
}

type ErrorResponse = string;

const signup = async (
  req: express.Request<never, never, SignupPayload, never>,
  res: express.Response<AuthResponse | ErrorResponse>
) => {
  try {
    const { username, password } = req.body;
    const foundUser = findUserByUsername(username);

    if (foundUser) {
      res.status(422).send('Username already been used');
    } else {
      const newUser = await createUser(username, password);
      res.status(200).send(constructAuthResponseWithJwt(newUser));
    }
  } catch (e) {
    console.log(e);
    res.status(500).send('Signup error');
  }
};

export default signup;
