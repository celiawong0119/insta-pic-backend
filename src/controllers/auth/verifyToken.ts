import express from 'express';

import { findUserByUserId } from '../../services/userServices';
import { constructAuthResponseWithJwt, verifyJwt, AuthResponse } from '../../utils/authUtils';

type ErrorResponse = string;

const verifyToken = async (
  req: express.Request,
  res: express.Response<AuthResponse | ErrorResponse>
) => {
  try {
    const token = req.headers['x-auth-token'] as string;
    const decoded = verifyJwt(token);
    const userId = decoded.id;
    const foundUser = findUserByUserId(userId);

    foundUser
      ? res.status(200).send(constructAuthResponseWithJwt(foundUser))
      : res.status(401).send('Verify token error');
  } catch (e) {
    res.status(401).send('Verify token error');
  }
};

export default verifyToken;
