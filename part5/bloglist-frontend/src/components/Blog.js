import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [details, showDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleClick = () => {
    showDetails(!details)
  }
  const handleDelete = () => {
    if ((window.confirm('Want to delete?'))) {
      removeBlog(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user[0].id,
      })
    }
    else return
  }
  const handleLike = (event) => {
    event.preventDefault()
    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user[0].id,
    })
  }
  return <div style={blogStyle}><div id='title'>
    {blog.title} </div><div id='author'>
    {blog.author} </div><button id='show' onClick={handleClick}>{details ? 'hide' : 'show'}</button>
  {details && <div><p id='url'>{blog.url} </p><p id='likes'>likes {blog.likes} <button id='like' onClick={handleLike}>like</button></p><p id='user'>{blog.user[0].username}</p> <button id='delete' onClick={handleDelete}>remove</button> </div>}

  </div>
}

export default Blog