import path from 'path';
import fs from 'fs';
import databaseJson from './database.json';

interface IDatabase {
  users: User[];
  posts: Post[];
}

const filePath = path.join(__dirname, './database.json');

// database reader and writer
const db = {
  read: (): IDatabase => {
    return databaseJson;
  },
  write: (stringifiedData: string): void => {
    fs.writeFile(filePath, stringifiedData, (err) => {
      if (err) {
        throw err;
      }
    });
  },
};

export default db;
