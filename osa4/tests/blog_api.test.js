const { text } = require('express');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

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

test('new blog can be added', async () => {

  const newBlog = {
    title: 'Bear attacks and how to defend',
    author: 'Dwight Schrute',
    url: 'blogs.dundermifflin.com'
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await api.get('/api/blogs');

  const blogFields = blogs.body.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url
    };
  });

  expect(blogFields).toContainEqual(newBlog);
  expect(blogs.body).toHaveLength(initialBlogs.length + 1);
});

test('if value for "likes" is not set it defaults to zero', async () => {
  const newBlog = {
    title: 'Bear attacks and how to defend',
    author: 'Dwight Schrute',
    url: 'blogs.dundermifflin.com'
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toBe(0);
});

test('responds with 400 Bad Request when trying to add a blog without "url" field', async () => {
  const blogWithoutUrl = {
    title: 'Unit testing is a lot of fun',
    author: 'Everyone'
  };

  const response = await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400);
});

test('responds with 400 Bad Request when trying to add a blog without "title" field', async () => {
  const blogWithoutTitle = {
    author: 'Just Me',
    url: 'not.important.io'
  };

  const response = await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});