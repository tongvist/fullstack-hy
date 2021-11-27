const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const User = require('../models/user');

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

blogRouter.post('/', async (request, response, next) => {
  let data = request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'missing or invalid token' });
    }

    if (!data.title || !data.url) {
      return response.status(400).send({ error: 'Missing required information.' });
    }

    if (!data.likes) {
      data.likes = 0;
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      const noUsersError =  new Error('No users in database');
      return next(noUsersError);
    }

    const blog = new Blog({
      title: data.title,
      author: data.author,
      url: data.url,
      likes: data.likes,
      user: user._id
    });

    const savedBlog = await blog.save();

    const newBlogs = user.blogs.concat(savedBlog);
    await User.updateOne({ _id: user._id }, { blogs: newBlogs });

    return response.status(201).json(savedBlog);

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