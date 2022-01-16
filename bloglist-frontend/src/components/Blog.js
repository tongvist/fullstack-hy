import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { updateCommentsAction } from '../reducers/reducers';
import blogService from '../services/blogs';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

const Blog = ({ handleUpdate, handleDelete }) => {
  const id = useParams().id;
  const blog = useSelector(state => state.blogs.find(b => b.id === id));
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    handleUpdate(updatedBlog);
  };

  const deleteBlog = () => {
    handleDelete(blog);
  };

  const handleCommentInput = ({ target }) => {
    setComment(target.value);
  };

  const resetCommentInput = () => {
    document.getElementById('new-comment').value = '';
    setComment('');
  };

  const addComment = () => {
    blogService.addComment(id, comment)
      .then(({ comments }) => {
        dispatch(updateCommentsAction({ id, comments }));
        resetCommentInput();
      })
      .catch(e => console.log(e));
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
      <h2 className='inline-p'>{ blog.title }</h2>

      <Table hover size='sm'>
        <tbody>
          <tr>
            <td>
              Author
            </td>
            <td>
              { blog.author }
            </td>
          </tr>
          <tr>
            <td>
              Url
            </td>
            <td>
              <a href={blog.url}>{ blog.url }</a>
            </td>
          </tr>

          <tr>
            <td>
              Likes
            </td>
            <td>
              { blog.likes }
            </td>
          </tr>

          <tr>
            <td>
              Added by
            </td>
            <td>
              { blog.user.name }
            </td>
          </tr>

        </tbody>
      </Table>

      { blog.user.name === user.name
        ? <Link to='/'>
          <button className='delete-blog-btn' onClick={deleteBlog}>delete</button>
        </Link>
        : null
      }
      <button onClick={ handleLike }>Like</button>

      <h3>Comments</h3>
      <div>
        <input id='new-comment' type='text' onChange={ handleCommentInput }></input>
        <button onClick={ addComment }>Add Comment</button>
      </div>
      <div className='comment-section'>
        {blog.comments.map(comment => {
          return (
            <Card bg='light' key={ comment._id }>
              <Card.Body>
                <p>{ comment.content }</p>
                <p className='comment-time'>{ new Date(comment.date).toLocaleString() }</p>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;