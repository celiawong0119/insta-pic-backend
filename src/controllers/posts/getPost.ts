import express from 'express';

import { findUserByUserId } from '../../services/userServices';
import { getAllPosts } from '../../services/postServices';

interface GetPostPayload {
  userId?: string; // number comes from query are strings
  sortByTime?: 'asc' | 'desc';
  pageNo?: string; // number comes from query are strings
  tailId?: string;
}

const getPost = async (
  req: express.Request<never, never, never, GetPostPayload>,
  res: express.Response
) => {
  try {
    const { userId, sortByTime = 'desc', pageNo = '1', tailId } = req.query;
    const PAGE_SIZE = 5;

    let result = getAllPosts();

    // filter userId if needed
    let authorName;
    if (userId) {
      const foundUser = findUserByUserId(parseInt(userId));
      if (!foundUser) {
        res.status(401).send();
        return;
      }
      result = result.filter((post) => foundUser.posts.includes(post.id));
      authorName = foundUser.username;
    }

    // sort by time if needed, default is desc
    if (sortByTime === 'asc') {
      result = result.sort((a: Post, b: Post) => a.createdTime - b.createdTime);
    }

    // return data at corresponding page only
    const sliceStart = tailId ? result.findIndex((item) => item.id === parseInt(tailId)) + 1 : 0;
    const sliceEnd = tailId ? PAGE_SIZE * parseInt(pageNo) : PAGE_SIZE;
    result = result.slice(sliceStart, sliceEnd);

    res.status(200).send({ authorName: authorName, posts: result });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

export default getPost;
