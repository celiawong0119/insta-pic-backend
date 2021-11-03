import express from 'express';

import { findUserByUserId } from '../../services/userServices';
import { createPost } from '../../services/postServices';

interface CreatePostContentPayload {
  userId: number;
  imageName: string;
  caption: string;
}

const createPostContent = async (
  req: express.Request<never, never, CreatePostContentPayload, never>,
  res: express.Response
) => {
  try {
    const { userId, imageName, caption } = req.body;

    if (!imageName || !caption) {
      res.status(422).send();
      return;
    }

    const foundUser = findUserByUserId(userId);

    if (!foundUser) {
      res.status(422).send();
      return;
    }

    const newPost = createPost(foundUser, imageName, caption);

    res.status(200).send({ newPostId: newPost.id });
  } catch (e) {
    res.status(500).send();
  }
};

export default createPostContent;
