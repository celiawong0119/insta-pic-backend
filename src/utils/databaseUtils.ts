import path from 'path';
import fs from 'fs';
import database from '../database/database.json';

interface IDatabase {
  users: IUser[];
  posts: Post[];
}
export const getDatabase = (): IDatabase => {
  return database;
};

const filePath = path.join(__dirname, '../database/database.json');
export const writeToDatabase = (stringifiedData: string) => {
  fs.writeFile(filePath, stringifiedData, (err) => {
    if (err) {
      throw err;
    }
  });
};
