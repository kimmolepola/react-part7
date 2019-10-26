import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlogForm';
import Blog from './components/Blog';
import './App.css';
import { useField } from './hooks';
import { setBlogs } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';

/* eslint-disable react/prop-types */
const App = ({ blogs, notification, ...props }) => {
  // const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const { reset: usernamereset, ...username } = useField('text', 'Username');
  const { reset: passwordreset, ...password } = useField('password', 'Password');

  useEffect(() => {
    blogService
      .getAll().then((initialBlogs) => {
        props.setBlogs(initialBlogs);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const usr = JSON.parse(loggedUserJSON);
      setUser(usr);
      blogService.setConfig(usr.token);
    }
  }, []);

  const notify = (message, msgClass) => {
    props.setNotification(message, msgClass);
    setTimeout(() => {
      props.setNotification(null);
    }, 5000);
  };

  const handleBlogDelete = async (id, title, author) => {
    if (window.confirm(`remove blog ${title} by ${author}`)) { // eslint-disable-line no-alert
      const response = await blogService.remove(id);
      if (response.status === 204) {
        const newStateBlogs = props.blogs.reduce((result, x) => {
          if (x.id !== id) {
            result.push(x);
          }
          return result;
        }, []);
        props.setBlogs(newStateBlogs);
      } else {
        notify('failed', 'error');
      }
    }
  };

  const handleBlogUpdate = async (content) => {
    const response = await blogService.put(content);
    const newStateBlogs = props.blogs.map((blg) => {
      if (blg.id === response.id) {
        const fullContent = { ...response };
        fullContent.user = blg.user;
        return fullContent;
      }
      return blg;
    });
    props.setNewBlogs(newStateBlogs);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const usr = await loginService.login({
        username: username.value, password: password.value,
      });
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(usr),
      );
      blogService.setConfig(usr.token);
      setUser(usr);
      usernamereset();
      passwordreset();
    } catch (exception) {
      notify('Wrong username or password', 'error');
    }
  };

  console.log('noti-------------', notification);

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in
        <button onClick={handleLogout} type="button">logout</button>
      </p>
      <NewBlogForm user={user} blogs={blogs} notify={notify} />
      {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleBlogUpdate={handleBlogUpdate}
          handleBlogDelete={handleBlogDelete}
          user={user}
        />
      ))}
    </div>
  );

  /* eslint-disable react/jsx-props-no-spreading */
  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
            username
          <input {...username} />
        </div>
        <div>
            password
          <input {...password} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
  /* eslint-enable react/jsx-props-no-spreading */

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  );
};

const dispatchToProps = {
  setBlogs,
  setNotification,
};

const stateToProps = (state) => ({
  blogs: state.blogs,
  notification: state.notification,
});

export default connect(stateToProps, dispatchToProps)(App);
