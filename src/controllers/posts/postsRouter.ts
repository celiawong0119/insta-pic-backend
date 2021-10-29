import express from 'express';
import multer from 'multer';
import path from 'path';

import { findUserByUserId } from '../../services/findUser';
import {
  getDatabase,
  writeToDatabase,
  currentDateInUnixTimeFormat,
} from '../../utils/databaseUtils';

interface CreatePostPayload {
  userId: number;
  imageName: string;
  caption: string;
}

interface GetPostPayload {
  userId: string; // number comes from query are strings
  sortByTime: 'asc' | 'desc';
  pageNo: string; // number comes from query are strings
}

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage }).single('file');

router.post('/upload-image', (req: express.Request, res: express.Response) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500);
    }

    // file should exist
    if (!req.file) {
      return res.status(422);
    }

    // file should be smaller than 2MB (2097152 bytes)
    if (req.file!.size > 2097152) {
      return res.status(422);
    }

    // file should contain image extensions
    const fileExtension = path.extname(req.file!.filename).split('.').pop();
    if (!fileExtension || !['jpg', 'jpeg', 'png', 'svg'].includes(fileExtension!)) {
      return res.status(422);
    }
    console.log(fileExtension);
    return res.status(200).send(req.file!.filename);
  });
});

router.post(
  '/',
  async (req: express.Request<never, never, CreatePostPayload, never>, res: express.Response) => {
    try {
      const { userId, imageName, caption } = req.body;

      const database = getDatabase();

      if (!imageName || !caption) {
        res.status(422).send();
        return;
      }

      const foundUser = findUserByUserId(userId);

      if (!foundUser) {
        res.status(422).send();
        return;
      }

      const newPost: Post = {
        id: database.posts.length + 1,
        imageName: imageName,
        caption: caption,
        createdTime: currentDateInUnixTimeFormat,
        author: { userId: foundUser.id, name: foundUser.username },
      };

      // create post with desc order
      database.posts.unshift(newPost);
      foundUser!.posts.unshift(newPost.id);

      writeToDatabase(JSON.stringify(database));
      res.status(200).send({ newPostId: newPost.id });
    } catch (e) {
      res.status(500).send();
    }
  }
);

router.get(
  '/',
  async (req: express.Request<never, never, never, GetPostPayload>, res: express.Response) => {
    try {
      const { userId, sortByTime, pageNo } = req.query;
      console.log(userId, sortByTime, pageNo);

      const database = getDatabase();
      let result = [...database.posts];

      // filter userId if needed
      if (userId) {
        const foundUser = findUserByUserId(parseInt(userId));
        if (!foundUser) {
          res.status(404).send();
          return;
        }
        result = result.filter((post) => foundUser.posts.includes(post.id));
      }

      // sort by time if needed
      if (sortByTime) {
        result =
          sortByTime === 'asc'
            ? result.sort((a: Post, b: Post) => a.createdTime - b.createdTime)
            : result; // default is sorted by desc
      }

      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }
);

export default router;
