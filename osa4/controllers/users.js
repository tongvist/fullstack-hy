const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require ('../models/user');

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users.map(user => user.toJSON()));
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', async (request, response, next) => {
  const user = request.body;

  if (user.password.length < 3) {
    return response.status(400).send({ error: 'Password too short' });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      username: user.username,
      name: user.name,
      passwordHash
    });

    const savedUser = await User.create(newUser);
    response.status(201).json(savedUser);

  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;