import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [details, showDetails] = useState(false);
  const dispatch = useDispatch();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const handleClick = () => {
    showDetails(!details);
  };
  const handleDelete = () => {
    if (window.confirm('Want to delete?')) {
      try {
        removeBlog(blog.id, {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes,
          user: blog.user[0].id
        });
        const notification = {
          message: `${blog.title} was successfully deleted`,
          type: 'update'
        };
        dispatch(setNotification(notification));
      } catch {
        const notification = {
          message: `error`,
          type: 'error'
        };
        dispatch(setNotification(notification));
      }
    } else return;
  };
  const handleLike = (event) => {
    event.preventDefault();
    try {
      updateBlog(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user[0].id
      });
      const notification = {
        message: `${blog.title} likes increased`,
        type: 'update'
      };
      dispatch(setNotification(notification));
    } catch {
      const notification = {
        message: `Error `,
        type: 'error'
      };
      dispatch(setNotification(notification));
    }
  };

  return (
    <div style={blogStyle}>
      <div id="title">{blog.title} </div>
      <div id="author">{blog.author} </div>
      <Button id="show" onClick={handleClick}>
        {details ? 'hide' : 'show'}
      </Button>
      {details && (
        <div>
          <p id="url">{blog.url} </p>
          <p id="likes">
            likes {blog.likes}{' '}
            <Button id="like" onClick={handleLike}>
              like
            </Button>
          </p>
          <p id="user">{blog.user[0].username}</p>{' '}
          <Button id="delete" onClick={handleDelete}>
            remove
          </Button>{' '}
        </div>
      )}
    </div>
  );
};

export default Blog;
