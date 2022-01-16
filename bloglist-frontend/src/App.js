import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';
import Info from './components/Info';
import Togglable from './components/Togglable';
import NewBlogForm from './components/NewBlogForm';
import { setInfoAction, resetInfoAction, initializeBlogs, addBlogAction, updateBlogAction, deleteBlogAction, setUserAction } from './reducers/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import Navbar from './components/Navbar';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        const orderedBlogs = blogs.sort((a, b) => b.likes - a.likes);
        dispatch(initializeBlogs(orderedBlogs));
      });
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      dispatch(setUserAction(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUserAction(user));
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
      blogFormRef.current.toggleVisibility();

      dispatch(addBlogAction(savedBlog));
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
      dispatch(updateBlogAction(updatedBlog));

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
      dispatch(setInfoAction('Blog deleted', 'success'));
      dispatch(deleteBlogAction(blogToDelete.id));

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
    <Router>
      <div>
        <h1>Blogs</h1>
        {user === null ?
          <div>
            <Info />
            { loginForm() }
          </div>
          :
          <div>
            <Info />

            <Navbar handleLogout={ handleLogout }/>

            <br />

            <Switch>
              <Route path='/users/:id'>
                <User />
              </Route>
              <Route path='/users'>
                <Users />
              </Route>
              <Route path='/blogs/:id'>
                <Blog handleUpdate={ updateBlog } handleDelete={ deleteBlog }/>
              </Route>
              <Route path='/'>
                { blogForm() }
                <div className='blog-list'>
                  {blogs.map(blog => {
                    return (
                      <div key={blog.id} className='blog'>
                        <Link to={`/blogs/${blog.id}`}>
                          <p className='inline-p'>&quot;{ blog.title }&quot; by { blog.author }</p>
                        </Link>
                      </div>);
                  })}
                </div>
              </Route>
            </Switch>
          </div>
        }
      </div>
    </Router>
  );
};

export default App;