const User = require('../models/user');

const initialUsers = [
  {
    username: 'initial_1',
    name: 'Initial I',
    password: 'newpassword'
  },
  {
    username: 'initial_2',
    name: 'Initial II',
    password: 'newpassword'
  },
  {
    username: 'initial_3',
    name: 'Initial III',
    password: 'newpassword'
  }
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  usersInDb, initialUsers
};