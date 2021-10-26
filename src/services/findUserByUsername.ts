import database from '../database/database.json';

const findUserByUsername = (username: string): IUser | undefined => {
  return database.users.find((user) => user.username === username);
};

export default findUserByUsername;
