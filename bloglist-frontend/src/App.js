import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log('Logging in with credentials: ', username, password);

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');

    } catch (exception) {
      setErrorMessage('Wrong username or password.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}>
        </input>
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}>
        </input>
      </div>
      <button type='submit'>Login</button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? 
        loginForm() 
        :
        <div>
          <p className='logged-in-user'>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
      }
    </div>
  )
}

export default App