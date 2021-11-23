const blogRouter = require('./controllers/blogs');
const cors = require('cors');
const config = require('./utils/config');
const express = require("express");
const mongoose = require('mongoose');

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

module.exports = app;