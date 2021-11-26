const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const cors = require('cors');
const config = require('./utils/config');
const express = require('express');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

const app = express();

logger.info('Connecting to MongoDB...');
mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info('Connected to MongoDB.');
  })
  .catch(error => logger.error('Error connecting to MongoDB', error));

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
};

const unknownEndpoint = (request, response, next) => {
  request.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;