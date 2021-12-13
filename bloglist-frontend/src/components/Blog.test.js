import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('renders only title and author by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'test.url'
  };

  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();

  const user = 'test user';
  const handleUpdate = mockUpdate;
  const handleDelete = mockDelete;

  const component = render(
    <Blog blog={ blog }
      user={ user }
      handleUpdate={ handleUpdate }
      handleDelete={ handleDelete }
    />
  );

  expect(component.container).toHaveTextContent('Test Blog');
  expect(component.container).toHaveTextContent('Test Author');
  expect(component.container).not.toHaveTextContent('likes');
});