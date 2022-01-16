import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

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
      <h3>Added blogs:</h3>
      <ListGroup>
        {
          getUserBlogs().map(b => {
            const url = `/blogs/${b.id}`;
            return (
              <ListGroup.Item key={b.id}>
                <Link to={url}>
                  { b.title }
                </Link>
              </ListGroup.Item>
            );
          })
        }
      </ListGroup>
    </div>
  );
};

export default User;