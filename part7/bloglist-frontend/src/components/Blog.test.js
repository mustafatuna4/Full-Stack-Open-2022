import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Blog from './Blog';

describe('Blog component fuctions properly', () => {
  const blog = {
    title: 'Mustafi',
    author: 'Mustafa Tuna',
    url: 'https://arsenal.com/',
    likes: 2,
    user: [
      {
        username: 'root',
        name: 'tester'
      }
    ]
  };

  const likeMockHandler = jest.fn();
  let container;
  beforeEach(() => {
    container = render(
      <Blog key={blog.id} blog={blog} updateBlog={likeMockHandler} />
    ).container;
  });
  test('<BlogForm /> does not display url or likes without clicking show', () => {
    expect(container.querySelector('#title')).toHaveTextContent(blog.title);
    expect(container.querySelector('#author')).toHaveTextContent(blog.author);
    expect(container.querySelector('#likes')).not.toBeInTheDocument();
    expect(container.querySelector('#url')).not.toBeInTheDocument();
  });

  test('blogs url and number of likes are shown when the Button controlling the shown details has been clicked', async () => {
    const Button = container.querySelector('#show');
    await userEvent.click(Button);
    expect(container.querySelector('#likes')).toBeInTheDocument();
    expect(container.querySelector('#url')).toBeInTheDocument();
  });

  test('blogs url and number of likes are shown when the Button controlling the shown details has been clicked', async () => {
    const buttonShow = container.querySelector('#show');
    await userEvent.click(buttonShow);
    const Button = container.querySelector('#like');
    await userEvent.click(Button);
    await userEvent.click(Button);
    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});
