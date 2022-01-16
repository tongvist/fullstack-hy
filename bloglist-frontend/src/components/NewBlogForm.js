import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

const NewBlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const saveBlog = (event) => {
    event.preventDefault();

    handleSubmit({
      title, author, url
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={saveBlog}>
        <Table hover>
          <tbody>
            <tr>
              <td>
                <label>Title</label>
              </td>
              <td>
                <input
                  id='new-blog-title'
                  type='text'
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}>
                </input>
              </td>
            </tr>

            <tr>
              <td>
                <label>Author</label>
              </td>
              <td>
                <input
                  id='new-blog-author'
                  type='text'
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}>
                </input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Url</label>
              </td>
              <td>
                <input
                  id='new-blog-url'
                  type='text'
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}>
                </input>
              </td>
            </tr>
          </tbody>
        </Table>
        <button type='submit'>Save</button>
      </form>
    </div>
  );};

export default NewBlogForm;