import React, { useState } from "react";

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
    }

    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={saveBlog}>
          <div>
            <label>Title</label>
            <input
              type='text'
              value={title}
              onChange={({ target }) => setTitle(target.value)}>
            </input>
          </div>

          <div>
            <label>Author</label>
            <input
              type='text'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}>
            </input>
          </div>
          <div>
            <label>Url</label>
            <input
              type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value)}>
            </input>
          </div>
          <button type='submit'>Save</button>
        </form>
      </div>
    )};

export default NewBlogForm;