import path from 'path';
import fs from 'fs';

const filePath = path.join(__dirname, '../database/database.json');

export const writeToDatabase = (stringifiedData: string) => {
  fs.writeFile(filePath, stringifiedData, (err) => {
    if (err) {
      throw err;
    }

    console.log('modified DB successfully');
  });
};
