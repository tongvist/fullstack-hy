import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const User = () => {
  const id = useParams().id;
  const blogs = useSelector(state => state.blogs);
  const user = blogs.find(b => b.user.id === id).user;

  const getUserBlogs = () => {
    return blogs.filter(blog => blog.user.id === id);
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs:</h2>
      <ul>
        {
          getUserBlogs().map(b => {
            const url = `/blogs/${b.id}`;
            return (
              <Link key={b.id} to={url}>
                <li>{b.title}</li>
              </Link>
            );
          })
        }
      </ul>
    </div>
  );
};

export default User;