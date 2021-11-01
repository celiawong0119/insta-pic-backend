import db from '../database/db';
import { getNowInUnixTimeFormat } from '../utils/dateUtils';

export const getAllPosts = (): Post[] => {
  const database = db.read();
  return [...database.posts];
};

export const createPost = (author: User, imageName: string, caption: string): Post => {
  const database = db.read();
  const newPost: Post = {
    id: database.posts.length + 1,
    imageName: imageName,
    caption: caption,
    createdTime: getNowInUnixTimeFormat(),
    author: { userId: author.id, name: author.username },
  };

  // store post into db with desc order
  database.posts.unshift(newPost);
  author.posts.unshift(newPost.id);
  db.write(JSON.stringify(database));
  return newPost;
};
