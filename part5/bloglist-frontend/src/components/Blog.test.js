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
      username: 'root',
      name: 'tester',
    }],
  }

  const likeMockHandler = jest.fn()
  let container
  beforeEach(() => {
    container  = render(
      <Blog key={blog.id} blog={blog} updateBlog={likeMockHandler} />
    ).container
  })
  test('<BlogForm /> does not display url or likes without clicking show', () => {

    expect(container.querySelector('#title')).toHaveTextContent(
      blog.title
    )
    expect(container.querySelector('#author')).toHaveTextContent(
      blog.author
    )
    expect(container.querySelector('#likes')).not.toBeInTheDocument()
    expect(container.querySelector('#url')).not.toBeInTheDocument()
  }
  )

  test('blogs url and number of likes are shown when the button controlling the shown details has been clicked', async () => {

    const button = container.querySelector('#show')
    await userEvent.click(button)
    expect(container.querySelector('#likes')).toBeInTheDocument()
    expect(container.querySelector('#url')).toBeInTheDocument()
  })

  test('blogs url and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const buttonShow = container.querySelector('#show')
    await userEvent.click(buttonShow)
    const button = container.querySelector('#like')
    await userEvent.click(button)
    await userEvent.click(button)
    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })

})
