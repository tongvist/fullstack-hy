const { totalLikes, favoriteBlog, mostBlogs } = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

describe('totalLikes', () => {

  test('when list has only one blog equals the likes of that one blog', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has many blogs equals the sum of likes in the blogs', () => {
    const result = totalLikes(blogs);
    expect(result).toBe(36);
  });

  test('when list of blogs is empty is zero', () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });
});

describe('favoriteBlog', () => {
  test('returns the single blog when only one blog is provided', () => {
    const result = favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test('returns the blog with most likes when many blogs are provided', () => {
    const result = favoriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });

  test('returns -1 when an emtpy array is provided', () => {
    const result = favoriteBlog([]);
    expect(result).toBe(-1);
  });
});

describe('mostBlogs', () => {
  test('returns null if an empty array is provided', () => {
    const result = mostBlogs([]);
    expect(result).toBe(null);
  });

  test('returns the name and number of blogs if only one blog is provided', () => {
    const result = mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });

  test('returns an object with the name of the author with most blogs and the number of blogs', () => {
    const result = mostBlogs(blogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs : 3
    });
  });
});