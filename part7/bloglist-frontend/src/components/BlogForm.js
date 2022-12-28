import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setAuthor] = useState('');
  const [newUrl, setUrl] = useState('');

  const dispatch = useDispatch();
  const createBlog = (event) => {
    event.preventDefault();
    try {
      const blog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      };

      dispatch(addBlog(blog));
      const notification = {
        message: `New blog added `,
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

    setNewTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <div>
      <h1>Blogs</h1>

      <Form onSubmit={createBlog}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="text"
            value={newUrl}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button id="create" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};
export default BlogForm;
