import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Blog = ({ handleUpdate, handleDelete }) => {
  const id = useParams().id;
  const blog = useSelector(state => state.blogs.find(b => b.id === id));
  const user = useSelector(state => state.user);

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    handleUpdate(updatedBlog);
  };

  const deleteBlog = () => {
    handleDelete(blog);
  };

  return (
    <div className='blog'>
      <h2 className='inline-p'>{ blog.title } by {blog.author}</h2>

      <p><a href={blog.url}>{ blog.url }</a></p>

      <p className='inline-p'>Likes: { blog.likes }</p>
      <button onClick={ handleLike }>Like</button>

      <p>Added by: { blog.user.name }</p>
      <p>{ blog.user.name === user.name
        ? <Link to='/'>
          <button className='delete-blog-btn' onClick={deleteBlog}>delete</button>
        </Link>
        : null }
      </p>
    </div>
  );
};

export default Blog;