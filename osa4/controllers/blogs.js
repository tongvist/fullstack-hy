const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (err) {
    next(error);
  }
});

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    return response.status(400).send({ error: 'Missing required information.' });
  }

  if (!blog.likes) {
    blog.likes = 0;
  }

  try {
    const result = await Blog.create(blog);
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;