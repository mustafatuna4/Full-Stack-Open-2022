import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setAuthor('')
    setUrl('')
  }
  return <div><h1>Blogs</h1>

    <form onSubmit={addBlog}>
      <div>
          title
        <input
          id='title'
          type="text"
          value={newTitle}
          name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
          author
        <input
          id='author'
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
          url
        <input
          id='url'
          type="text"
          value={newUrl}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id='create' type="submit">create</button>
    </form>
  </div>
}
export default BlogForm
