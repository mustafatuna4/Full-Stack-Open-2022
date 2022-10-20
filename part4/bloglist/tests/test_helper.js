const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Ultimatom',
    author: 'Jason Bourne',
    url: 'xd.com',
    likes: '2'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'GG',
    author: 'Arteezy',
    url: 'wp.com',
    likes: '3'
  })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb,usersInDb
}