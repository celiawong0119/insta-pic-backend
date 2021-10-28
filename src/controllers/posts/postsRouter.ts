import express from 'express';

import { findUserByUserId } from '../../services/findUser';
import {
  getDatabase,
  writeToDatabase,
  currentDateInUnixTimeFormat,
} from '../../utils/databaseUtils';

interface PostPayload {
  userId: number;
  imageFile: File;
  caption: string;
}

const router = express.Router();

router.post(
  '/',
  async (req: express.Request<never, never, PostPayload, never>, res: express.Response) => {
    try {
      const { userId, imageFile, caption } = req.body;

      const database = getDatabase();

      if (!imageFile || !caption) {
        res.status(422).send();
        return;
      }

      const foundUser = findUserByUserId(userId);

      if (!foundUser) {
        res.status(422).send();
        return;
      }

      const newPost: IPost = {
        id: database.posts.length + 1,
        imageFile: imageFile,
        caption: caption,
        createdTime: currentDateInUnixTimeFormat,
      };

      database.posts.push(newPost);

      foundUser!.posts.push(newPost.id);

      writeToDatabase(JSON.stringify(database));
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }
);

export default router;
