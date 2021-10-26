import express from 'express';

const JWT_KEY = 'Datalouder1234';

const verifyJwt = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // implement your verify JWT function here, assume token is stored in request header with name "x-auth-token"
};

export default verifyJwt;
