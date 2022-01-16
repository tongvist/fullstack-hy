import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      <Form className='new-blog-form' onSubmit={ saveBlog }>
        <Form.Group>
          <Form.Label>
            Title
          </Form.Label>
          <Form.Control
            id='new-blog-title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Author
          </Form.Label>
          <Form.Control
            id='new-blog-author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Url
          </Form.Label>
          <Form.Control
            id='new-blog-url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}>
          </Form.Control>
        </Form.Group>
        <Button id='new-form-submit' variant='primary' type='submit'>Save</Button>
      </Form>
    </div>
  );};

export default NewBlogForm;