import express from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage }).single('file');

const uploadPostImage = (req: express.Request, res: express.Response) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }

    // file should exist
    if (!req.file) {
      return res.status(422);
    }

    // file should be smaller than 3MB (3145728 bytes)
    if (req.file!.size > 3145728) {
      return res.status(422);
    }

    // file should contain image extensions
    const fileExtension = path.extname(req.file!.filename).split('.').pop();
    if (!fileExtension || !['jpg', 'jpeg', 'png', 'svg'].includes(fileExtension!)) {
      return res.status(422);
    }

    return res.status(200).send(req.file!.filename);
  });
};

export default uploadPostImage;
