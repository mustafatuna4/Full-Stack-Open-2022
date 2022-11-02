import { useState, useEffect, useRef  } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [update, setUpdateMessage] = useState('')
  const [error, setErrorMessage] = useState('')
  const Notification = ({ message, type }) => {
    if (message === '') {
      return ''
    }
    if (type === update) {
      return (
        <div className='update'>
          {message}
        </div>
      )
    }
    else {
      return (
        <div className='error'>
          {message}
        </div>
      )
    }
  }
  const deleteLocalUser = () => {
    window.localStorage.clear()
    setUser(null)
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => { return setUsername(event.target.value) }
  const handlePasswordChange = (event) => { return setPassword(event.target.value) }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setUpdateMessage(`${user.username} successfully logged in`)
      setTimeout(() => { setUpdateMessage('') }, 5000)
    }

    catch (exception) {
      setErrorMessage('Incorrect credentials')
      setTimeout(() => { setErrorMessage('') }, 5000)
      return
    }
  }
  const createBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setUpdateMessage(`${blogObject.title} was added`)
        setTimeout(() => { setUpdateMessage('') }, 5000)
      })
  }

  const updateBlog = (id,blogObject) => {
    blogService
      .update(id,blogObject)
      .then( (returnedBlog) => {
        setBlogs(blogs.map((blog) =>
          blog.id === id ? returnedBlog : blog))
        setUpdateMessage(`${blogObject.title} likes increased`)
        setTimeout(() => { setUpdateMessage('') }, 5000)
      })
      .catch
      (error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => { setErrorMessage('') }, 5000)
        return
      })
  }
  const deleteBlog = (id, blogObject) => {
    blogService.erase(id)
      .then(() => {
        setUpdateMessage(`${blogObject.title} was deleted`)
        setTimeout(() => { setUpdateMessage('') }, 5000)
        setBlogs((blogs.filter(item => item.id !== id)))
      })
      .catch
      (error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => { setErrorMessage('') }, 5000)
        return
      })
  }
  const blogFormRef = useRef()

  return (
    <div>
      {error !== '' ? <Notification message={error} type={error} /> : ''}
      {update !== '' ? <Notification message={update} type={update} /> : ''}
      <h1>HELLO</h1>
      {!user ?
        <Togglable buttonLabel='login'>
          <LoginForm handleLogin={handleLogin} handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} password={password} username={username} />
        </Togglable> :
        <div>
          <p>{user.name} logged in <button onClick={deleteLocalUser}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      }
      <ul>
        {blogs.sort((a, b) =>  b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={deleteBlog}
          />
        )}
      </ul>

    </div>
  )
}
export default App
