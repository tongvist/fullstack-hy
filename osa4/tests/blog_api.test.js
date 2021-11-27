const app = require('../app');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');

const api = supertest(app);
const Blog = require('../models/blog');

const createTempBlog = async (authHeader) => {
  const deletedSoon = { title: 'This will be deleted', author: 'unknown', url: 'blog.tobe.deleted' };
  const addedTempBlog = await api.post('/api/blogs')
    .set('Authorization', authHeader)
    .send(deletedSoon);
  const id = addedTempBlog.body.id;

  // await api.delete(`/api/blogs/${id}`);
  return id;
};

const generateAuthHeader = async (uname, pword) => {
  const user = await api.post('/api/login')
    .send({
      username: uname,
      password: pword
    });
  const token = user.body.token;
  return `bearer ${token}`;
};

const initialBlogs = [
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

// beforeEach(async () => {
//   await Blog.deleteMany({});
//   const blogObjects = initialBlogs
//     .map(blog => new Blog(blog));
//   const promiseArray = blogObjects.map(blog => blog.save());
//   await Promise.all(promiseArray);
// });
describe('when fetching all blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = initialBlogs
      .map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('blogs have a identification field called "id"', async () => {
    const response = await api.get('/api/blogs/');
    expect(response.body[0].id).toBeDefined();
  });
});

describe('when adding a new blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    await api.post('/api/users').send({ username: 'user', name: 'User One', password: 'password' });
  });
  test('new blog can be added if a user exists in database', async () => {
    // await User.deleteMany({});
    // const newUser = helper.initialUsers[0];
    const newUser = {
      username: 'user',
      password: 'password'
    };
    await api
      .post('/api/users')
      .send(newUser);

    const newBlog = {
      title: 'Bear attacks and how to defend',
      author: 'Dwight Schrute',
      url: 'blogs.dundermifflin.com'
    };

    const token = await generateAuthHeader(newUser.username, newUser.password);

    const response = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await api.get('/api/blogs');

    // const blogFields = blogs.body.map(blog => {
    //   return {
    //     title: blog.title,
    //     author: blog.author,
    //     url: blog.url
    //   };
    // });

    // expect(blogFields).toContainEqual(newBlog);
    expect(response.body.author).toBe(newBlog.author);
    expect(blogs.body).toHaveLength(1);
  });

  test('if value for "likes" is not set it defaults to zero', async () => {
    const newBlog = {
      title: 'Bear attacks and how to defend',
      author: 'Dwight Schrute',
      url: 'blogs.dundermifflin.com'
    };
    const newUser = {
      username: 'user',
      password: 'password'
    };

    const token = await generateAuthHeader(newUser.username, newUser.password);

    const response = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('responds with 400 Bad Request when trying to add a blog without url field', async () => {
    const blogWithoutUrl = {
      title: 'Unit testing is a lot of fun',
      author: 'Everyone'
    };
    const newUser = {
      username: 'user',
      password: 'password'
    };

    const token = await generateAuthHeader(newUser.username, newUser.password);

    const response = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(blogWithoutUrl)
      .expect(400);
  });

  test('responds with 400 Bad Request when trying to add a blog without title field', async () => {
    const blogWithoutTitle = {
      author: 'Just Me',
      url: 'not.important.io'
    };

    const newUser = {
      username: 'user',
      password: 'password'
    };

    const token = await generateAuthHeader(newUser.username, newUser.password);

    const response = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(blogWithoutTitle)
      .expect(400);
  });

  test('user information is added to the blog', async () => {
    const users = await helper.usersInDb();
    const userToAdd = users[0];

    const blog = {
      title: 'blog with user',
      author: 'User Name',
      url: 'not.valid.uri',
    };

    const newUser = {
      username: 'user',
      password: 'password'
    };

    const token = await generateAuthHeader(newUser.username, newUser.password);

    const newBlog = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(newBlog.body.user.toString()).toBe(userToAdd.id);
  });
});

describe('when deleting a blog', () => {
  test('responds with 204 with a valid id', async () => {
    // const blogToDelete = blogsInStart.body[0];
    // console.log(blogToDelete);
    const newUser = {
      username: 'user',
      password: 'password'
    };

    const token = await generateAuthHeader(newUser.username, newUser.password);

    const blogId = await createTempBlog(token);
    const blogsInStart = await api.get('/api/blogs');
    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', token)
      .expect(204);

    const blogsAfter = await api.get('/api/blogs');
    expect(blogsAfter.body).toHaveLength(blogsInStart.body.length - 1);
  });

});

describe('updating a blog', () => {
  beforeEach(async() => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    await api.post('/api/users').send({ username: 'user', name: 'User One', password: 'password' });
  });

  test('returns the updated blog with correct modifications', async () => {
    // const blogToUpdate = blogsInStart.body[0];
    const newBlog = { title: 'no title', author: 'no author', url: 'does.not.matter', likes: 1 };
    const newUser = {
      username: 'user',
      password: 'password'
    };

    const token = await generateAuthHeader(newUser.username, newUser.password);

    const createdBlog = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog);
    // console.log('CREATED BLOG', createdBlog.body);

    // const blogsInStart = await api.get('/api/blogs');
    const id = createdBlog.body.id.toString();
    const updatedBlog = { ...createdBlog.body, likes: createdBlog.body.likes + 1 };

    const result = await api.put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // console.log('RESULT' ,result);

    expect(result.body.likes).toBe(newBlog.likes + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});