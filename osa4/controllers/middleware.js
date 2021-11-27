const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
    return next();
  }
  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).send({ error: 'missing or invalid token' });
    }
    const user = await User.findById(decodedToken.id);
    if (!user) {
      const userNotFound = new Error('User not found');
      next(userNotFound);
    }
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { tokenExtractor, userExtractor };