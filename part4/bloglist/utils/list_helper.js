var _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {
  const max =  Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes===max)
}

const mostBlogs = (blogs) => {
  const names = blogs.map(blog => blog.author)
  const result = _.values(_.groupBy(names)).map(d => ({ author: d[0], blogs: d.length }))
  return _.maxBy(result, 'blogs')
}

const mostLikes = (blogs) => {
  let authorLikes = _.reduce((blogs),(result,{ author, likes }) => {
    result[author] = result[author] || 0
    result[author] += likes
    return result
  },{})
  const key = Object.keys(authorLikes)
  const m_key = authorLikes[key[0]]

  const likes = key.map(blog => authorLikes[blog])
  const maxKey = _.max(likes)
  return {author: _.find(key,blog => authorLikes[blog]===maxKey),blogs:maxKey}

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}