import { filterPostsByUser, sortPostsByAscendingOrder, getPostsByPage } from '../utils/postUtils';

const mockUser = {
  id: 1,
  username: 'Tom',
  password: 'Aa12345',
  posts: [1],
};

const mockPosts = [
  {
    id: 6,
    imageName: '1635695915276-Avatar1.jpg',
    caption: 'b jai',
    createdTime: 1635695940,
    author: {
      userId: 3,
      name: 'Celia',
    },
  },
  {
    id: 5,
    imageName: '1635695915276-Avatar1.jpg',
    caption: 'b jai',
    createdTime: 1635695935,
    author: {
      userId: 3,
      name: 'Celia',
    },
  },
  {
    id: 4,
    imageName: '1635695915276-Avatar1.jpg',
    caption: 'b jai',
    createdTime: 1635695930,
    author: {
      userId: 3,
      name: 'Celia',
    },
  },
  {
    id: 3,
    imageName: '1635695915276-Avatar1.jpg',
    caption: 'b jai',
    createdTime: 1635695925,
    author: {
      userId: 3,
      name: 'Celia',
    },
  },
  {
    id: 2,
    imageName: '1635695915276-Avatar1.jpg',
    caption: 'b jai',
    createdTime: 1635695920,
    author: {
      userId: 3,
      name: 'Celia',
    },
  },
  {
    id: 1,
    imageName: '1635695915276-Avatar1.jpg',
    caption: 'b jai',
    createdTime: 1635695915,
    author: {
      userId: 1,
      name: 'Tom',
    },
  },
];

describe('filterPostsByUser', () => {
  const expectedOutcome = [
    {
      id: 1,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695915,
      author: {
        userId: 1,
        name: 'Tom',
      },
    },
  ];
  it('should filter posts by user', () => {
    expect(filterPostsByUser(mockUser, [...mockPosts])).toEqual(expectedOutcome);
  });
});

describe('sortPostsByAscendingOrder', () => {
  const expectedOutcome = [
    {
      id: 1,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695915,
      author: {
        userId: 1,
        name: 'Tom',
      },
    },
    {
      id: 2,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695920,
      author: {
        userId: 3,
        name: 'Celia',
      },
    },
    {
      id: 3,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695925,
      author: {
        userId: 3,
        name: 'Celia',
      },
    },
    {
      id: 4,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695930,
      author: {
        userId: 3,
        name: 'Celia',
      },
    },
    {
      id: 5,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695935,
      author: {
        userId: 3,
        name: 'Celia',
      },
    },
    {
      id: 6,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695940,
      author: {
        userId: 3,
        name: 'Celia',
      },
    },
  ];
  it('should sort posts by ascending order', () => {
    expect(sortPostsByAscendingOrder([...mockPosts])).toEqual(expectedOutcome);
  });
});

describe('getPostsByPage', () => {
  const expectedOutcomeAtPage1 = [
    {
      id: 6,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695940,
      author: {
        userId: 3,
        name: 'Celia',
      },
    },
    {
      id: 5,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695935,
      author: {
        userId: 3,
        name: 'Celia',
      },
    },
    {
      id: 4,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695930,
      author: {
        userId: 3,
        name: 'Celia',
      },
    },
    {
      id: 3,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695925,
      author: {
        userId: 3,
        name: 'Celia',
      },
    },
    {
      id: 2,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695920,
      author: {
        userId: 3,
        name: 'Celia',
      },
    },
  ];

  const expectedOutcomeAtLastPage = [
    {
      id: 1,
      imageName: '1635695915276-Avatar1.jpg',
      caption: 'b jai',
      createdTime: 1635695915,
      author: {
        userId: 1,
        name: 'Tom',
      },
    },
  ];

  it('should get 5 posts in a page', () => {
    const mockPageNo = '1';
    expect(getPostsByPage([...mockPosts], mockPageNo)).toEqual(expectedOutcomeAtPage1);
  });
  it('should get all posts in a page if there are less than 5 posts in a page', () => {
    const mockPageNo = '2';
    const mockTailId = '2';
    expect(getPostsByPage([...mockPosts], mockPageNo, mockTailId)).toEqual(
      expectedOutcomeAtLastPage
    );
  });
  it('edge case: claim to be a page > 1 but no tailId, should return page 1', () => {
    const mockPageNo = '10';
    expect(getPostsByPage([...mockPosts], mockPageNo)).toEqual(expectedOutcomeAtPage1);
  });
});
