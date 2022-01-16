import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { updateCommentsAction } from '../reducers/reducers';
import blogService from '../services/blogs';

const Blog = ({ handleUpdate, handleDelete }) => {
  const id = useParams().id;
  const blog = useSelector(state => state.blogs.find(b => b.id === id));
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    handleUpdate(updatedBlog);
  };

  const deleteBlog = () => {
    handleDelete(blog);
  };

  useEffect(() => {
    blogService.getComments(id)
      .then(comments => {
        dispatch(updateCommentsAction({ id, comments }));
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <div className='blog'>
      <h2 className='inline-p'>{ blog.title } by {blog.author}</h2>

      <p><a href={blog.url}>{ blog.url }</a></p>

      <p className='inline-p'>Likes: { blog.likes }</p>
      <button onClick={ handleLike }>Like</button>

      <p>Added by: { blog.user.name }</p>
      { blog.user.name === user.name
        ? <Link to='/'>
          <button className='delete-blog-btn' onClick={deleteBlog}>delete</button>
        </Link>
        : null
      }
      <h3>Comments</h3>
      <ul>
        {blog.comments.map(comment => {
          return (
            <li key={ comment }>
              { comment }
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Blog;