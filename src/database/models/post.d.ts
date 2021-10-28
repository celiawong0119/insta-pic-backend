interface Post {
  id: number;
  imageName: string;
  caption: string;
  createdTime: number;
  author: { userId: number; name: string };
}
