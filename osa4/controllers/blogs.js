const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

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

blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    await Blog.findByIdAndRemove(id);
    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;
  const data = request.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true, context: 'query' });
    return response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;