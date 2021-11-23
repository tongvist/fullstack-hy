const blogRouter = require('./controllers/blogs');
const cors = require('cors');
const config = require('./utils/config');
const express = require("express");
const logger = require('./utils/logger');
const mongoose = require('mongoose');

const app = express();

logger.info('Connecting to MongoDB...')
mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info('Connected to MongoDB.')
    })
    .catch(error => logger.error('Error connecting to MongoDB', error));

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

module.exports = app;