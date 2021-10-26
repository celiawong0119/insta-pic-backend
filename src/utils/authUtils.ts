import bcrypt from 'bcrypt';

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
