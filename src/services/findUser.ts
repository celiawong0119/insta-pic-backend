import database from '../database/database.json';

export const findUserByUsername = (username: string): IUser | undefined => {
  return database.users.find((user) => user.username === username);
};

export const findUserByUserId = (userId: number): IUser | undefined => {
  console.log(database.users);
  return database.users.find((user) => user.id == userId);
};
