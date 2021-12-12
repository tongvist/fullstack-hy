import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';
import Info from './components/Info';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [infoMessage, setInfoMessage] = useState('');
  const [infoType, setInfoType] = useState('');
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

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

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');

    } catch (exception) {
      setInfoMessage('Wrong username or password.');
      setInfoType('error');
      setTimeout(() => {
        setInfoMessage(null);
        setInfoType(null);
      }, 5000)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      const savedBlog = await blogService.create({ 
        title: newBlogTitle, 
        author: newBlogAuthor, 
        url: newBlogUrl 
      });
      setBlogs(blogs.concat(savedBlog));

      setInfoMessage(`Blog "${savedBlog.title}" saved successfully`);
      setInfoType('success');
      setTimeout(() => {
        setInfoMessage(null);
        setInfoType(null);
      }, 5000);
      
      setNewBlogTitle('');
      setNewBlogAuthor('');
      setNewBlogUrl('');

    } catch (exception) {
      setInfoMessage('Error saving new blog');
      setInfoType('error');
      setTimeout(() => {
        setInfoMessage(null);
        setInfoType(null);
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

  const newBlogForm = () => (
    <form onSubmit={handleNewBlog}>
      <div>
        <label>Title</label>
        <input
          type='text'
          value={newBlogTitle}
          onChange={({target}) => setNewBlogTitle(target.value)}>
        </input>
      </div>

      <div>
        <label>Author</label>
        <input
          type='text'
          value={newBlogAuthor}
          onChange={({target}) => setNewBlogAuthor(target.value)}>
        </input>
        </div>
      <div>
        <label>Url</label>
        <input
          type='text'
          value={newBlogUrl}
          onChange={({target}) => setNewBlogUrl(target.value)}>
        </input>
      </div>
      <button type='submit'>Save</button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ?
        <div>
          <Info message={infoMessage} type={infoType}/>
          {loginForm()} 
        </div>
        :
        <div>
          <div>
            <Info message={infoMessage} type={infoType}/>
          </div>
          <p className='logged-in-user'>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          <div>
            <h2>Create new</h2>
            {newBlogForm()}
          </div>
          <br />

          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
      }
    </div>
  )
}

export default App