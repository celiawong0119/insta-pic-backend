import bcrypt from 'bcrypt';
import { add, getUnixTime } from 'date-fns';
import jwt from 'jsonwebtoken';

// generate hashed password
export const generateHashedPassword = (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// verify a incoming password with a db password
export const verifyPassword = async (
  inputPassword: string,
  dbPassword: string
): Promise<boolean> => {
  return bcrypt.compare(inputPassword, dbPassword);
};

// return a response for signup/login/verifyToken api
export const JWT_KEY = 'JWTKey_insta_pic';

const getExpireDateInUnixTimeFormat = (): number => {
  const expireDate = add(Date.now(), { days: 7 });
  return getUnixTime(expireDate);
};

export interface AuthResponse {
  jwtToken: string;
  jwtTokenExpires: number;
  data: {
    id: number;
    username: string;
    posts: number[];
  };
}
export const constructAuthResponseWithJwt = (foundUser: IUser): AuthResponse => {
  const exp = getExpireDateInUnixTimeFormat();
  const jwtToken = jwt.sign({ id: foundUser.id, exp: exp }, JWT_KEY);

  return {
    jwtToken: jwtToken,
    jwtTokenExpires: exp,
    data: { id: foundUser.id, username: foundUser.username, posts: foundUser.posts },
  };
};
