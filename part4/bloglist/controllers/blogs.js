const blogsRouter = require('express').Router()
const { findById } = require('../models/blog')
const User = require('../models/user')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.tokenExtractor,middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes?body.likes:0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog.toJSON());

})

blogsRouter.delete('/:id',middleware.tokenExtractor,middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() === user._id.toString() ){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else{
    return response.status(401).json({ error: 'Error! Cannot delete another users blog.' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const user =  await User.findById(body.user)
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes?body.likes:0,
    user: user._id
  }

 const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(returnedBlog.toJSON())
})

module.exports = blogsRouter