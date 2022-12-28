import { useEffect, useRef, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { eraseBlog, getBlogs, incrementLike } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { logUser } from './reducers/userReducer';
import blogService from './services/blogs';
import loginService from './services/login';
const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  let user = useSelector((state) => state.user);
  const deleteLocalUser = () => {
    window.localStorage.clear();

    dispatch(logUser(null));
  };

  const [...blogs] = useSelector((state) => state.blogs);
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(logUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleUsernameChange = (event) => {
    return setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    return setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(logUser(user));
      setUsername('');
      setPassword('');
      const notification = {
        message: `${user.username} successfully logged in`,
        type: 'update'
      };
      dispatch(setNotification(notification));
    } catch (exception) {
      const notification = {
        message: 'Incorrect credentials',
        type: 'error'
      };
      dispatch(setNotification(notification));
      return;
    }
  };
  const updateBlog = (id, blogObject) => {
    dispatch(incrementLike(id, blogObject));
  };
  const deleteBlog = (id, blogObject) => {
    dispatch(eraseBlog(id));
  };
  const blogFormRef = useRef();

  return (
    <div className="container">
      <Router>
        <NavBar></NavBar>
        <h1>HELLO</h1>
        {<Notification></Notification>}
        {!user ? (
          <Togglable buttonLabel="login">
            <LoginForm
              handleLogin={handleLogin}
              handlePasswordChange={handlePasswordChange}
              handleUsernameChange={handleUsernameChange}
              password={password}
              username={username}
            />
          </Togglable>
        ) : (
          <div>
            <p>
              {user.name} logged in{' '}
              <Button onClick={deleteLocalUser}>logout</Button>
            </p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm />
            </Togglable>
          </div>
        )}
        <Routes>
          <Route
            path="/blogs"
            element={
              <Table striped>
                <tbody>
                  {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <tr key={blog.id}>
                        <td>
                          <Blog
                            key={blog.id}
                            blog={blog}
                            updateBlog={updateBlog}
                            removeBlog={deleteBlog}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;
