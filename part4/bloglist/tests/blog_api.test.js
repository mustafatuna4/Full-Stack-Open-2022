const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 100000)
describe('blogs are returned and can be displayed correctly', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('id exists', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })
})
describe('blogs can be added with correct information ', () => {

  let passwordHash
  beforeEach(async () => {
    await User.deleteMany({})
    passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })


  test('a valid blog can be added ', async () => {
    const user = {
      username: 'root',
      password: 'sekret'
    }

    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Mustafa Tuna Acar',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const authors = blogsAtEnd.map(n => n.author)
    expect(authors).toContain(
      'Mustafa Tuna Acar'
    )
  })
  test('a blog is not added without correct token ', async () => {
    const user = {
      username: 'root',
      password: 'sekret'
    }

    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Mustafa Tuna Acar',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without like part is 0 by default', async () => {
    const user = {
      username: 'root',
      password: 'sekret'
    }

    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const newBlog = {
      title: 'Full Stack 2022',
      author: 'Mustafa Tuna Acar',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    expect((blogsAtEnd[helper.initialBlogs.length]) === 0)
  })


  test('blog without url or title parts is not added', async () => {
    const user = {
      username: 'root',
      password: 'sekret'
    }

    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    const newBlog = {
      author: 'Mustafa Tuna Acar',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const oldUser = {
      username: 'root',
      password: 'sekret'
    }

    const response = await api
      .post('/api/login')
      .send(oldUser)
      .expect(200)

    const newBlog = {
      title: 'Full Stack 2022',
      author: 'Mustafa Tuna Acar',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length-1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const ids = blogsAtEnd.map(r => r.id)

    expect(ids).not.toContain(blogToDelete.id)
  })
})

describe('updating a blog', () => {
  test('a blog can be updated', async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const oldUser = {
      username: 'root',
      password: 'sekret'
    }

    const response = await api
      .post('/api/login')
      .send(oldUser)
      .expect(200)

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${response.body.token}`)
      .send({ likes: 5 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
    expect(blogsAtEnd[0].likes === 5)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
