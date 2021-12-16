const blogRouter = require('./controllers/blogs');
const config = require('./utils/config');
const cors = require('cors');
const express = require('express');
const logger = require('./utils/logger');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');
const { tokenExtractor } = require('./controllers/middleware');
const userRouter = require('./controllers/users');

const app = express();

logger.info('Connecting to MongoDB...');
mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info('Connected to MongoDB.');
  })
  .catch(error => logger.error('Error connecting to MongoDB', error));

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const router = require('./controllers/testing');
  app.use('/api/testing', router);
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: 'invalid or missing token' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).send({ error: 'token expired' });
  }
  else {
    return response.status(400).send({ error: error.message });
  }
};

const unknownEndpoint = (request, response, next) => {
  return response.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;