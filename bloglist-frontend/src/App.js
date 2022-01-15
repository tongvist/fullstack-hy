import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';
import Info from './components/Info';
import Togglable from './components/Togglable';
import NewBlogForm from './components/NewBlogForm';
import { setInfoAction, resetInfoAction } from './reducers/reducers';
import { useDispatch } from 'react-redux';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => {
        return b.likes - a.likes;
      }))
    );
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
      dispatch(setInfoAction('Wrong username or password.', 'error'));
      setTimeout(() => {
        dispatch(resetInfoAction());
      }, 5000);
    }
  };

  const addBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(savedBlog));

      blogFormRef.current.toggleVisibility();

      dispatch(setInfoAction(`Blog "${savedBlog.title}" saved successfully`, 'success'));

      setTimeout(() => {

        dispatch(resetInfoAction());
      }, 5000);
    } catch (exception) {
      dispatch(setInfoAction('Error saving new blog', 'error'));

      setTimeout(() => {
        dispatch(resetInfoAction());
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}>
        </input>
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}>
        </input>
      </div>
      <button id='login' type='submit'>Login</button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <NewBlogForm handleSubmit={addBlog}/>
    </Togglable>
  );

  const updateBlog = async (newBlog) => {
    try {
      const updatedBlog = await blogService.update(newBlog);

      setBlogs(blogs.map(blog => blog.id !== newBlog.id ? blog : updatedBlog));

    } catch (exception) {
      dispatch(setInfoAction('Error updating blog.', 'error'));
      setTimeout(() => {
        dispatch(resetInfoAction());
      }, 5000);
    }
  };

  const deleteBlog = async (blogToDelete) => {
    const confirm = window.confirm(`Delete "${blogToDelete.title}" ?`);
    if (!confirm) {
      return;
    }

    try {
      await blogService.deleteBlog(blogToDelete.id);
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));
      dispatch(setInfoAction('Blog deleted', 'success'));

      setTimeout(() => {
        dispatch(resetInfoAction());
      }, 5000);

    } catch (exception) {
      dispatch(setInfoAction('Error deleting blog.', 'error'));

      setTimeout(() => {
        dispatch(resetInfoAction());
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ?
        <div>
          <Info />
          { loginForm() }
        </div>
        :
        <div>
          <div>
            <Info />
          </div>
          <p className='logged-in-user'>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          { blogForm() }

          <br />

          <div className='blog-list'>
            {blogs.map(blog => <Blog
              key={blog.id}
              blog={blog}
              user={user.name}
              handleUpdate={updateBlog}
              handleDelete={deleteBlog}
            />)}
          </div>
        </div>
      }
    </div>
  );
};

export default App;