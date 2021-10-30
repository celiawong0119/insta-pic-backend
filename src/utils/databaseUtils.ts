import path from 'path';
import fs from 'fs';
import { getUnixTime } from 'date-fns';
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

const currentDate = Date.now();
export const currentDateInUnixTimeFormat = getUnixTime(currentDate);
