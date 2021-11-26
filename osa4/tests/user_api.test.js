const app = require('../app');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');

const api = supertest(app);
describe('when fetching users', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
  });

  test('all users can be fetched', async () => {
    const users = await api.get('/api/users');
    expect(users.body.length).toBe(3);
  });
});

describe('when adding a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({
      username:'jestuser',
      passwordHash
    });

    await user.save();
  });

  test('creation succeeds with a new username', async () => {
    const userAtStart = await helper.usersInDb();
    const user = {
      username: 'newJester',
      name: 'Jester Tester',
      password: 'newpassword'
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(userAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(user.username);
  });

  test('responds with status code 400 and proper message if username is already in use', async () => {
    const userAtStart = await helper.usersInDb();
    const userWithUsedUsername = {
      username: 'jestuser',
      name: 'Username Taken',
      password: 'notvalid'
    };
    const result = await api
      .post('/api/users')
      .send(userWithUsedUsername)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(userAtStart.length);
    expect(result.body.error).toContain('`username` to be unique');

  });

  test('responds with status code 400 and a proper message if username is too short', async () => {
    const userAtStart = await helper.usersInDb();
    const userWithShortUsername = {
      username: 'je',
      name: 'jester',
      password: 'jestertester'
    };

    const result = await api
      .post('/api/users')
      .send(userWithShortUsername)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(userAtStart.length);

    const regExp = new RegExp('(`username`)|(is\\sshorter)');
    expect(result.body.error).toMatch(regExp);
  });

  test('responds with status code 400 and a message if username is not provided', async () => {
    const userAtStart = await helper.usersInDb();
    const userWithoutUsername = {
      name: 'nousername',
      password: 'notvalid'
    };

    const result = await api
      .post('/api/users')
      .send(userWithoutUsername)
      .expect(400);

    expect(result.body.error).toContain('`username` is required');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(userAtStart.length);
  });

  test('responds with status code 400 and a message if password is too short', async () => {
    const userAtStart = await helper.usersInDb();
    const userWithShortPassword = {
      username: 'jester',
      name: 'Jester Tester',
      password: 'je'
    };

    const result = await api
      .post('/api/users')
      .send(userWithShortPassword)
      .expect(400);

    expect(result.body.error).toContain('Password too short');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(userAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});