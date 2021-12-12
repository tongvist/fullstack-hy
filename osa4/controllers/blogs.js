const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const User = require('../models/user');
const { userExtractor } = require('./middleware');

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 });

    response.json(blogs);

  } catch (err) {
    next(error);
  }
});

blogRouter.post('/', userExtractor, async (request, response, next) => {
  let data = request.body;

  try {
    if (!data.title || !data.url) {
      return response.status(400).send({ error: 'Missing required information.' });
    }

    if (!data.likes) {
      data.likes = 0;
    }

    const blog = new Blog({
      title: data.title,
      author: data.author,
      url: data.url,
      likes: data.likes,
      user: request.user._id
    });

    const savedBlog = await blog.save();

    const newBlogs = request.user.blogs.concat(savedBlog);
    await User.updateOne({ _id: request.user._id }, { blogs: newBlogs });

    return response.status(201).json(savedBlog);

  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {

  const blogId = request.params.id;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return response.status(404).send({ message: 'Blog was already deleted' });
    }
    const userId = blog.user.toString();

    if (request.user._id.toString() !== userId) {
      return response.status(401).send({ error: 'You cannot delete this' });
    }

    await Blog.findByIdAndRemove(blogId);

    const updatedBlogs = request.user.blogs.filter(userBlog => userBlog.toString() !== blog._id.toString());
    await User.updateOne({ _id: request.user._id }, { blogs: updatedBlogs });

    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;
  const data = request.body;
  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(id, data, { new: true, context: 'query' })
      .populate('user', { username: 1, name: 1 });
    return response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;