import bcrypt from 'bcrypt';
import { add, getUnixTime } from 'date-fns';

export const generateHashedPassword = (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (
  inputPassword: string,
  dbPassword: string
): Promise<boolean> => {
  return bcrypt.compare(inputPassword, dbPassword);
};

const expireDate = add(Date.now(), { days: 7 });
export const expireDateInUnixTimeFormat = getUnixTime(expireDate);
