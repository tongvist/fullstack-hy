import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;

  beforeEach(() => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'test.url',
      likes: 2,
      user: {
        name: 'test user'
      }
    };

    const mockUpdate = jest.fn();
    const mockDelete = jest.fn();

    const handleUpdate = mockUpdate;
    const handleDelete = mockDelete;

    component = render(<Blog blog={ blog } handleUpdate={ handleUpdate } handleDelete={ handleDelete } />);
  });

  test('renders only title and author by default', () => {


    expect(component.container).toHaveTextContent('Test Blog');
    expect(component.container).toHaveTextContent('Test Author');
    expect(component.container).not.toHaveTextContent(/Likes:/);
  });

  test('displays also the url and likes if the blog view has been expanded', () => {
    const viewButton = component.getByText('View');
    fireEvent.click(viewButton);

    const expandedBlog = component.container.querySelector('.blog');
    expect(expandedBlog).toHaveTextContent('test.url');
    expect(expandedBlog).toHaveTextContent(/Likes: 2/);
  });
});