export const filterPostsByUser = (user: User, posts: Post[]): Post[] => {
  return posts.filter((post) => user.posts.includes(post.id));
};

export const sortPostsByAscendingOrder = (posts: Post[]): Post[] => {
  return posts.sort((a: Post, b: Post) => a.createdTime - b.createdTime);
};

export const getPostsByPage = (posts: Post[], pageNo: string, tailId?: string): Post[] => {
  const PAGE_SIZE = 5;
  const sliceStart = tailId ? posts.findIndex((item) => item.id === parseInt(tailId)) + 1 : 0;
  const sliceEnd = tailId ? PAGE_SIZE * parseInt(pageNo) : PAGE_SIZE;
  return posts.slice(sliceStart, sliceEnd);
};
