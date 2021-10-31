import { generateHashedPassword } from 'src/utils/authUtils';
import db from 'src/database';

export const findUserByUsername = (username: string): IUser | undefined => {
  const database = db.read();
  return database.users.find((user) => user.username === username);
};

export const findUserByUserId = (userId: number): IUser | undefined => {
  const database = db.read();
  return database.users.find((user) => user.id == userId);
};

export const createUser = async (username: string, password: string): Promise<IUser> => {
  const database = db.read();
  const hashedPassword = await generateHashedPassword(password);
  const newUser = {
    id: database.users.length + 1,
    username: username,
    password: hashedPassword,
    posts: [],
  };
  database.users.push(newUser);
  db.write(JSON.stringify(database));
  return newUser;
};
