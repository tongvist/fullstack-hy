import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();

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

    component = render(<Blog blog={ blog } handleUpdate={ mockUpdate } handleDelete={ mockDelete } />);

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

  test('pressing the like-button calls the event handler', () => {
    const viewButton = component.getByText('View');
    fireEvent.click(viewButton);

    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    const likesParagraph = component.getByText(/Likes:/);
    expect(likesParagraph).toHaveTextContent(/Likes: 4/);
    expect(mockUpdate.mock.calls).toHaveLength(2);
  });
});