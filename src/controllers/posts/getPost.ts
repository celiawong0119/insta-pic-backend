import express from 'express';

import { findUserByUserId } from '../../services/userServices';
import { getAllPosts } from '../../services/postServices';
import {
  filterPostsByUser,
  getPostsByPage,
  sortPostsByAscendingOrder,
} from '../../utils/postUtils';

interface GetPostPayload {
  userId?: string; // number comes from query are strings
  sortByTime?: 'asc' | 'desc';
  pageNo?: string; // number comes from query are strings
  tailId?: string; // number comes from query are strings
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
      result = filterPostsByUser(foundUser, result);
      authorName = foundUser.username;
    }

    // sort by time if needed, default is desc
    if (sortByTime === 'asc') {
      result = sortPostsByAscendingOrder(result);
    }

    // return data at corresponding page only
    result = getPostsByPage(result, pageNo, tailId);

    res.status(200).send({ authorName: authorName, posts: result });
  } catch (e) {
    res.status(500).send();
  }
};

export default getPost;
