import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component fuctions properly', () => {
  const blog = {
    title: 'Mustafi',
    author: 'Mustafa Tuna',
    url: 'https://arsenal.com/',
    likes: 2,
    user: [{
      username: 'root   ',
      name: 'tester',
    }],
  }

  const createMockHandler =  jest.fn().mockImplementation((e) => e.preventDefault())
  let container
  beforeEach(() => {
    container = render(
      <BlogForm createBlog={createMockHandler} />
    ).container
  })

  test('create blogs content is passed to props correctly', async () => {

    const title = container.querySelector('#title')
    await userEvent.type(title, 'Mustafi')
    const author = container.querySelector('#author')
    await userEvent.type(author, 'Mustafa Tuna')
    const url = container.querySelector('#url')
    await userEvent.type(url, 'https://arsenal.com/')
    const buttonCreate = container.querySelector('#create')
    await userEvent.click(buttonCreate)
    expect(createMockHandler.mock.calls).toHaveLength(1)
    expect(createMockHandler.mock.calls[0][0]).toEqual({ 'author': 'Mustafa Tuna', 'title': 'Mustafi', 'url': 'https://arsenal.com/' })
  })

})