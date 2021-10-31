import { generateHashedPassword } from 'src/utils/authUtils';
import { getDatabase, writeToDatabase } from 'src/utils/databaseUtils';
import database from '../database/database.json';

export const findUserByUsername = (username: string): IUser | undefined => {
  return database.users.find((user) => user.username === username);
};

export const findUserByUserId = (userId: number): IUser | undefined => {
  return database.users.find((user) => user.id == userId);
};

export const createUser = async (username: string, password: string): Promise<IUser> => {
  const database = getDatabase();
  const hashedPassword = await generateHashedPassword(password);
  const newUser = {
    id: database.users.length + 1,
    username: username,
    password: hashedPassword,
    posts: [],
  };
  database.users.push(newUser);
  writeToDatabase(JSON.stringify(database));
  return newUser;
};
