import express from 'express';

import createPostContent from './createPostContent';
import getPost from './getPost';
import uploadPostImage from './uploadPostImage';

const router = express.Router();

router.post('/upload-image', uploadPostImage);
router.post('/', createPostContent);
router.get('/', getPost);

export default router;
