import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlogForm from './NewBlogForm';

describe('<NewBlogForm />', () => {
  test('calls the handleSubmit function with correct data when blog is saved', () => {
    const handleSubmit = jest.fn();

    const component = render(
      <NewBlogForm handleSubmit={ handleSubmit }/>
    );

    const form = component.container.querySelector('form');
    const title = component.container.querySelector('#new-blog-title');
    const author = component.container.querySelector('#new-blog-author');
    const url = component.container.querySelector('#new-blog-url');

    fireEvent.change(title, {
      target: { value: 'Test Blog' }
    });

    fireEvent.change(author, {
      target: { value: 'Test Author' }
    });

    fireEvent.change(url, {
      target: { value: 'testing.url' }
    });

    fireEvent.submit(form);

    expect(handleSubmit.mock.calls[0][0].title).toBe('Test Blog');
    expect(handleSubmit.mock.calls[0][0].author).toBe('Test Author');
    expect(handleSubmit.mock.calls[0][0].url).toBe('testing.url');
  });
});